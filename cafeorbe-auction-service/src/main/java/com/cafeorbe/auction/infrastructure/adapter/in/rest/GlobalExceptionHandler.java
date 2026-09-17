package com.cafeorbe.auction.infrastructure.adapter.in.rest;

import com.cafeorbe.auction.domain.EstadoInvalidoException;
import com.cafeorbe.auction.domain.PujaInsuficienteException;
import com.cafeorbe.auction.domain.SubastaNoEncontradaException;
import com.cafeorbe.auction.domain.VendedorNoValidoException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(SubastaNoEncontradaException.class)
    ResponseEntity<Map<String, String>> subastaNoEncontrada(SubastaNoEncontradaException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(NoSuchElementException.class)
    ResponseEntity<Map<String, String>> noEncontrado(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(EstadoInvalidoException.class)
    ResponseEntity<Map<String, String>> estadoInvalido(EstadoInvalidoException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(PujaInsuficienteException.class)
    ResponseEntity<Map<String, String>> pujaInsuficiente(PujaInsuficienteException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(VendedorNoValidoException.class)
    ResponseEntity<Map<String, String>> vendedorNoValido(VendedorNoValidoException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<Map<String, String>> validacion(MethodArgumentNotValidException e) {
        Map<String, String> errores = new LinkedHashMap<>();
        e.getBindingResult().getFieldErrors().forEach(err -> errores.put(err.getField(), err.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
    }
}
