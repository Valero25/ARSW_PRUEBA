package com.cafeorbe.identity.infrastructure.adapter.in.rest;

import com.cafeorbe.identity.application.port.in.ObtenerRolUseCase;
import com.cafeorbe.identity.application.port.in.ObtenerUsuarioActualUseCase;
import com.cafeorbe.identity.infrastructure.adapter.in.rest.dto.UsuarioResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final ObtenerUsuarioActualUseCase obtenerUsuarioActualUseCase;
    private final ObtenerRolUseCase obtenerRolUseCase;
    private final com.cafeorbe.identity.application.port.in.AsignarRolUseCase asignarRolUseCase;

    public UsuarioController(ObtenerUsuarioActualUseCase obtenerUsuarioActualUseCase, ObtenerRolUseCase obtenerRolUseCase, com.cafeorbe.identity.application.port.in.AsignarRolUseCase asignarRolUseCase) {
        this.obtenerUsuarioActualUseCase = obtenerUsuarioActualUseCase;
        this.obtenerRolUseCase = obtenerRolUseCase;
        this.asignarRolUseCase = asignarRolUseCase;
    }

    /**
     * X-Usuario-Id llega propagado por cafeorbe-api-gateway, ya con la
     * firma del JWT validada. Este servicio no vuelve a validar el token.
     */
    @GetMapping("/me")
    public UsuarioResponse me(@RequestHeader("X-Usuario-Id") UUID usuarioId) {
        return UsuarioResponse.desde(obtenerUsuarioActualUseCase.obtener(usuarioId));
    }

    @GetMapping("/{id}/rol")
    public Map<String, String> rolDe(@PathVariable UUID id) {
        return Map.of("rol", obtenerRolUseCase.obtenerRolDe(id).name());
    }

    // TODO: En producción este endpoint debería estar restringido solo para administradores.
    @PostMapping("/{id}/rol")
    public void asignarRol(@PathVariable UUID id, @RequestBody Map<String, String> request) {
        // En una app real, aquí validaríamos que el usuario actual tenga rol ADMINISTRADOR
        // usando el token o el header propagado por el gateway.
        com.cafeorbe.identity.domain.model.Rol nuevoRol = com.cafeorbe.identity.domain.model.Rol.valueOf(request.get("rol"));
        asignarRolUseCase.asignarRol(new com.cafeorbe.identity.application.port.in.AsignarRolCommand(id, nuevoRol));
    }
}
