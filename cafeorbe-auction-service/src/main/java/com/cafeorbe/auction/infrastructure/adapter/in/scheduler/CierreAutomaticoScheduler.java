package com.cafeorbe.auction.infrastructure.adapter.in.scheduler;

import com.cafeorbe.auction.application.port.in.CerrarSubastasVencidasUseCase;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CierreAutomaticoScheduler {

    private final CerrarSubastasVencidasUseCase cerrarSubastasVencidasUseCase;

    public CierreAutomaticoScheduler(CerrarSubastasVencidasUseCase cerrarSubastasVencidasUseCase) {
        this.cerrarSubastasVencidasUseCase = cerrarSubastasVencidasUseCase;
    }

    @Scheduled(fixedRateString = "${subasta.cierre-automatico.intervalo-ms:1000}")
    public void revisarVencidas() {
        cerrarSubastasVencidasUseCase.cerrarVencidas();
    }
}
