package com.cafeorbe.auction.application;

import com.cafeorbe.auction.application.port.in.RegistrarPujaCommand;
import com.cafeorbe.auction.application.port.in.RegistrarPujaUseCase;
import com.cafeorbe.auction.application.port.out.EventoPublisher;
import com.cafeorbe.auction.application.port.out.PujaRepository;
import com.cafeorbe.auction.application.port.out.SubastaRepository;
import com.cafeorbe.auction.domain.EstadoInvalidoException;
import com.cafeorbe.auction.domain.PujaInsuficienteException;
import com.cafeorbe.auction.domain.model.EstadoSubasta;
import com.cafeorbe.auction.domain.model.Subasta;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RegistrarPujaServiceTest {

    @Mock
    SubastaRepository subastaRepository;
    @Mock
    PujaRepository pujaRepository;
    @Mock
    EventoPublisher eventoPublisher;

    RegistrarPujaService service;

    private final UUID subastaId = UUID.randomUUID();
    private final UUID pujadorId = UUID.randomUUID();

    @BeforeEach
    void setUp() {
        // Ventana anti-sniping 30s, extensión 10s, igual que el default de application.yml
        service = new RegistrarPujaService(subastaRepository, pujaRepository, eventoPublisher, 30, 10);
    }

    private Subasta subastaActiva(Instant deadline) {
        Subasta subasta = new Subasta(subastaId, UUID.randomUUID(), UUID.randomUUID(), BigDecimal.TEN);
        subasta.setEstado(EstadoSubasta.ACTIVA);
        subasta.setDeadline(deadline);
        return subasta;
    }

    @Test
    void rechaza_pujas_fuera_de_la_ventana_activa() {
        Subasta cerrada = subastaActiva(Instant.now().plusSeconds(60));
        cerrada.setEstado(EstadoSubasta.CERRADA);
        when(subastaRepository.buscarPorId(subastaId)).thenReturn(Optional.of(cerrada));

        RegistrarPujaCommand comando = new RegistrarPujaCommand(subastaId, pujadorId, BigDecimal.valueOf(20), "clave-1");

        assertThatThrownBy(() -> service.registrar(comando)).isInstanceOf(EstadoInvalidoException.class);
        verifyNoInteractions(pujaRepository, eventoPublisher);
    }

    @Test
    void reintento_con_misma_clave_no_repite_el_efecto() {
        Subasta activa = subastaActiva(Instant.now().plusSeconds(300));
        when(subastaRepository.buscarPorId(subastaId)).thenReturn(Optional.of(activa));
        when(pujaRepository.guardarSiEsNueva(any())).thenReturn(false);

        RegistrarPujaCommand comando = new RegistrarPujaCommand(subastaId, pujadorId, BigDecimal.valueOf(20), "clave-repetida");
        RegistrarPujaUseCase.Resultado resultado = service.registrar(comando);

        assertThat(resultado.montoActual()).isEqualByComparingTo(BigDecimal.TEN);
        verify(subastaRepository, never()).registrarPujaSiSupera(any(), any(), any());
        verifyNoInteractions(eventoPublisher);
    }

    @Test
    void rechaza_monto_que_no_supera_al_actual() {
        Subasta activa = subastaActiva(Instant.now().plusSeconds(300));
        when(subastaRepository.buscarPorId(subastaId)).thenReturn(Optional.of(activa));
        when(pujaRepository.guardarSiEsNueva(any())).thenReturn(true);
        when(subastaRepository.registrarPujaSiSupera(subastaId, pujadorId, BigDecimal.valueOf(5))).thenReturn(false);

        RegistrarPujaCommand comando = new RegistrarPujaCommand(subastaId, pujadorId, BigDecimal.valueOf(5), "clave-2");

        assertThatThrownBy(() -> service.registrar(comando)).isInstanceOf(PujaInsuficienteException.class);
    }

    @Test
    void puja_fuera_de_ventana_antisniping_no_extiende_el_tiempo() {
        Subasta activa = subastaActiva(Instant.now().plusSeconds(300)); // muy lejos del cierre
        when(subastaRepository.buscarPorId(subastaId)).thenReturn(Optional.of(activa));
        when(pujaRepository.guardarSiEsNueva(any())).thenReturn(true);
        when(subastaRepository.registrarPujaSiSupera(subastaId, pujadorId, BigDecimal.valueOf(20))).thenReturn(true);

        RegistrarPujaCommand comando = new RegistrarPujaCommand(subastaId, pujadorId, BigDecimal.valueOf(20), "clave-3");
        RegistrarPujaUseCase.Resultado resultado = service.registrar(comando);

        assertThat(resultado.tiempoExtendido()).isFalse();
        verify(subastaRepository, never()).extenderDeadline(any(), any());
    }

    @Test
    void puja_dentro_de_la_ventana_antisniping_extiende_el_tiempo() {
        Subasta activa = subastaActiva(Instant.now().plusSeconds(5)); // dentro de la ventana de 30s
        when(subastaRepository.buscarPorId(subastaId)).thenReturn(Optional.of(activa));
        when(pujaRepository.guardarSiEsNueva(any())).thenReturn(true);
        when(subastaRepository.registrarPujaSiSupera(subastaId, pujadorId, BigDecimal.valueOf(20))).thenReturn(true);

        RegistrarPujaCommand comando = new RegistrarPujaCommand(subastaId, pujadorId, BigDecimal.valueOf(20), "clave-4");
        RegistrarPujaUseCase.Resultado resultado = service.registrar(comando);

        assertThat(resultado.tiempoExtendido()).isTrue();
        verify(subastaRepository).extenderDeadline(eq(subastaId), any(Instant.class));
    }
}
