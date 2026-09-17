# cafeorbe-api-gateway

> Única puerta de entrada REST al backend de CafeOrbe.

---

## Rol en la arquitectura

Centraliza lo transversal para que ningún servicio tenga que resolverlo por su cuenta. Sin él, la SPA tendría que conocer seis URLs distintas y cada servicio repetiría la misma lógica de autenticación y CORS.

**Este repositorio es casi todo configuración, no código.** Será el que menos líneas tenga y el más crítico si se rompe.

## Responsabilidades

- Enrutamiento hacia los servicios de dominio
- Validación de la firma del JWT, una sola vez por request
- Propagación de la identidad resuelta a los servicios
- Configuración de CORS y terminación TLS
- Rate limiting

## Fuera de alcance

Esto **no** vive aquí:

- Cualquier lógica de negocio. Si aparece un `if` sobre reglas del dominio, está en el repositorio equivocado
- La emisión de tokens — la hace `cafeorbe-identity-service`
- El tráfico WebSocket — va por `cafeorbe-realtime-gateway`

## API principal

```
/auth/**        → cafeorbe-identity-service
/usuarios/**    → cafeorbe-identity-service
/lotes/**       → cafeorbe-auction-service
/subastas/**    → cafeorbe-auction-service
/transmisiones/** → cafeorbe-streaming-service
/productos/**   → cafeorbe-store-service
/ordenes/**     → cafeorbe-store-service
/envios/**      → cafeorbe-shipping-service
```

## Rate limiting

Es la razón principal por la que este gateway existe desde el punto de vista de seguridad. Aquí se frena a quien intente enviar cientos de pujas por segundo desde un script.

Configurar límites diferenciados: el endpoint de pujas necesita permitir ráfagas legítimas durante una subasta activa, pero cortar el abuso automatizado.

## Nota de planificación

Es de las pocas piezas que se puede posponer sin generar deuda técnica grave. Si el equipo va con los tiempos justos, es válido arrancar con el front llamando directo a los servicios e introducir el gateway en el sprint 3 o 4: agregarlo después solo cambia URLs, no lógica.

## Cómo levantarlo

```bash
# 1. Levantar dependencias compartidas (base de datos, broker)
git clone https://github.com/cafeorbe/cafeorbe-infra
cd cafeorbe-infra && docker compose up -d

# 2. Levantar este servicio
cp .env.example .env
docker compose up --build
```

Variables de entorno requeridas: ver `.env.example`.

## Definition of Done

Una historia está terminada en este repositorio cuando:

- Pull request aprobado por alguien distinto del autor
- Pruebas unitarias en verde, cobertura mínima del 70% en `domain/`
- Pruebas de integración de los endpoints expuestos
- Criterios de aceptación verificados por alguien distinto de quien programó
- Documentación OpenAPI actualizada
- Sin credenciales ni secretos en el repositorio
- Desplegado y funcionando en el ambiente de pruebas

## Repositorios relacionados

| Repositorio | Relación |
|---|---|
| `cafeorbe-contracts` | Esquemas de eventos y DTOs compartidos |
| `cafeorbe-infra` | Docker Compose, despliegue, broker y base de datos |
| `cafeorbe-api-gateway` | Punto de entrada REST |
| `cafeorbe-realtime-gateway` | Punto de entrada WebSocket |

---

Parte de **CafeOrbe** — Plataforma de Subastas de Café en Tiempo Real.
