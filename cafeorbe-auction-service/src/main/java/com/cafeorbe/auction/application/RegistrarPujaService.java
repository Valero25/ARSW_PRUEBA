package com.cafeorbe.auction.application;

import com.cafeorbe.contracts.events.auction.PujaRegistrada;
import com.cafeorbe.contracts.events.auction.TiempoExtendido;
import com.cafeorbe.auction.application.port.in.RegistrarPujaCommand;
import com.cafeorbe.auction.application.port.in.RegistrarPujaUseCase;
import com.cafeorbe.auction.application.port.out.EventoPublisher;
import com.cafeorbe.auction.application.port.out.PujaRepository;
import com.cafeorbe.auction.application.port.out.SubastaRepository;
import com.cafeorbe.auction.domain.EstadoInvalidoException;
import com.cafeorbe.auction.domain.PujaInsuficienteException;
import com.cafeorbe.auction.domain.SubastaNoEncontradaException;
import com.cafeorbe.auction.domain.model.Puja;
import com.cafeorbe.auction.domain.model.Subasta;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

/**
 * El corazón concurrente del sistema. Orden no negociable:
 * 1) reservar la clave de idempotencia ANTES de tocar el estado de la
 *    subasta — si el registro de la puja se hiciera primero, un reintento
 *    de red podría aplicar el efecto dos veces antes de que la idempotencia
 *    lo detectara.
 * 2) escritura condicional atómica del monto (nunca leer-comparar-escribir).
 * 3) anti-sniping y registro, misma transacción @Transactional.
 */
@Service
public class RegistrarPujaService implements RegistrarPujaUseCase {

    private final SubastaRepository subastaRepository;
    private final PujaRepository pujaRepository;
    private final EventoPublisher eventoPublisher;
    private final Duration ventanaAntiSniping;
    private final Duration extensionAntiSniping;

    public RegistrarPujaService(SubastaRepository subastaRepository, PujaRepository pujaRepository, EventoPublisher eventoPublisher,
                                 @Value("${subasta.anti-sniping.ventana-segundos:30}") long ventanaSegundos,
                                 @Value("${subasta.anti-sniping.extension-segundos:10}") long extensionSegundos) {
        this.subastaRepository = subastaRepository;
        this.pujaRepository = pujaRepository;
        this.eventoPublisher = eventoPublisher;
        this.ventanaAntiSniping = Duration.ofSeconds(ventanaSegundos);
        this.extensionAntiSniping = Duration.ofSeconds(extensionSegundos);
    }

    @Override
    @Transactional
    public Resultado registrar(RegistrarPujaCommand comando) {
        Subasta subasta = subastaRepository.buscarPorId(comando.subastaId())
                .orElseThrow(() -> new SubastaNoEncontradaException(comando.subastaId()));

        if (!subasta.puedeRecibirPujas()) {
            throw new EstadoInvalidoException("La subasta " + comando.subastaId() + " no admite pujas en este momento");
        }

        UUID pujaId = UUID.randomUUID();
        boolean esNueva = pujaRepository.guardarSiEsNueva(new Puja(
                pujaId, comando.subastaId(), comando.pujadorId(), comando.monto(),
                comando.claveIdempotencia(), Instant.now()));

        if (!esNueva) {
            // Reintento de red o doble clic: no repetir el efecto, solo
            // devolver el estado actual.
            Subasta actual = subastaRepository.buscarPorId(comando.subastaId())
                    .orElseThrow(() -> new SubastaNoEncontradaException(comando.subastaId()));
            return new Resultado(actual.getId(), actual.getMontoActual(), actual.getLiderId(), false);
        }

        boolean prospero = subastaRepository.registrarPujaSiSupera(comando.subastaId(), comando.pujadorId(), comando.monto());
        if (!prospero) {
            throw new PujaInsuficienteException(comando.monto(), subasta.getMontoActual());
        }

        boolean tiempoExtendido = false;
        if (subasta.estaEnVentanaAntiSniping(Instant.now(), ventanaAntiSniping)) {
            Instant nuevoDeadline = Instant.now().plus(extensionAntiSniping);
            subastaRepository.extenderDeadline(comando.subastaId(), nuevoDeadline);
            eventoPublisher.publicar(new TiempoExtendido(comando.subastaId(), nuevoDeadline, (int) extensionAntiSniping.toSeconds()));
            tiempoExtendido = true;
        }

        eventoPublisher.publicar(new PujaRegistrada(
                comando.subastaId(), pujaId, comando.pujadorId(), comando.monto(),
                comando.claveIdempotencia(), Instant.now()));

        return new Resultado(comando.subastaId(), comando.monto(), comando.pujadorId(), tiempoExtendido);
    }
}
