package com.cafeorbe.auction.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

interface SubastaJpaRepository extends JpaRepository<SubastaEntity, UUID> {

    /**
     * Escritura condicional: solo prospera si el monto nuevo supera al
     * actual. Nunca leer, comparar en memoria y escribir — entre la lectura
     * y la escritura cabe otra puja.
     */
    @Modifying
    @Query("""
            UPDATE SubastaEntity s
            SET s.montoActual = :monto, s.liderId = :pujadorId
            WHERE s.id = :subastaId AND s.montoActual < :monto
            """)
    int registrarPujaSiSupera(
            @Param("subastaId") UUID subastaId,
            @Param("pujadorId") UUID pujadorId,
            @Param("monto") BigDecimal monto);

    @Modifying
    @Query("UPDATE SubastaEntity s SET s.deadline = :nuevoDeadline WHERE s.id = :subastaId AND s.estado = 'ACTIVA'")
    void extenderDeadline(@Param("subastaId") UUID subastaId, @Param("nuevoDeadline") Instant nuevoDeadline);

    @Modifying
    @Query("UPDATE SubastaEntity s SET s.estado = 'ACTIVA', s.deadline = :deadline WHERE s.id = :subastaId AND s.estado = 'PROGRAMADA'")
    int activar(@Param("subastaId") UUID subastaId, @Param("deadline") Instant deadline);

    @Modifying
    @Query("UPDATE SubastaEntity s SET s.estado = 'CERRADA' WHERE s.id = :subastaId AND s.estado = 'ACTIVA'")
    int marcarCerrada(@Param("subastaId") UUID subastaId);

    @Query("SELECT s FROM SubastaEntity s WHERE s.estado = 'ACTIVA' AND s.deadline <= :ahora")
    List<SubastaEntity> buscarActivasConDeadlineVencido(@Param("ahora") Instant ahora);
}
