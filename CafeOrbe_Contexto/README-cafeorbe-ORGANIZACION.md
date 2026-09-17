# CafeOrbe

> Plataforma de Subastas de Café en Tiempo Real. Conecta caficultores del Eje Cafetero con compradores mediante transmisiones en vivo con puja abierta.

---

## El problema

El precio que recibe el caficultor lo fija el Contrato C de la Bolsa de Nueva York, no la calidad de su lote. Un productor con un café excepcional recibe casi lo mismo que uno con un lote corriente, porque ambos entran al mismo canal indiferenciado.

CafeOrbe permite subastar lotes en vivo, con puja abierta y visible, de modo que el precio lo fije la competencia entre compradores.

## Arquitectura

Microservicios comunicados por APIs REST y eventos, siguiendo principios de arquitectura hexagonal.

```
                    cafeorbe-web
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
    cafeorbe-api-gateway    cafeorbe-realtime-gateway
            │                           │
            ▼                           │
  ┌─────────────────────────────────────┴──────┐
  │  identity · auction · streaming            │
  │  store · shipping                          │
  └─────────────────┬──────────────────────────┘
                    ▼
              Bus de eventos
                    │
                    ▼
      notification (R2) · analytics (R3)
```

## Repositorios

### Microservicios de dominio

| Repositorio | Responsabilidad |
|---|---|
| `cafeorbe-identity-service` | Registro, login, roles, JWT |
| `cafeorbe-auction-service` | Lotes, temporizador, pujas, anti-sniping, cierre |
| `cafeorbe-streaming-service` | Salas de transmisión en vivo |
| `cafeorbe-store-service` | Tienda a precio fijo y compra directa |
| `cafeorbe-shipping-service` | Estado y costo del envío |

### Capas de entrada

| Repositorio | Responsabilidad |
|---|---|
| `cafeorbe-web` | SPA, único cliente del MVP |
| `cafeorbe-api-gateway` | Enrutamiento REST, JWT, CORS, rate limiting |
| `cafeorbe-realtime-gateway` | WebSocket, fan-out de pujas, conteo de conectados |

### Soporte

| Repositorio | Responsabilidad |
|---|---|
| `cafeorbe-contracts` | Esquemas de eventos y DTOs versionados |
| `cafeorbe-infra` | Docker Compose, despliegue, pipelines |

### Diferidos

| Repositorio | Release |
|---|---|
| `cafeorbe-notification-service` | Release 2 |
| `cafeorbe-analytics-service` | Release 3 |

## Releases

| Release | Alcance |
|---|---|
| **1 — MVP** | Valida que una subasta en vivo pueda ejecutarse y liquidarse. Épicas 1 a 4 |
| **2 — Comercialización y pagos** | KYC, múltiples métodos de pago, reembolsos, notificaciones |
| **3 — Logística y analítica** | Integración con transportadoras, reportes históricos |

## Backlog

5 épicas, 10 features y 33 historias de usuario, priorizadas con MoSCoW. El backlog vive en Azure DevOps.

**Convención de tags:** cada work item lleva release (`Release-1`), origen en el desglose (`Epica-4`, `F4.2`) y prioridad (`MoSCoW-Must`).

## Empezar

```bash
git clone https://github.com/cafeorbe/cafeorbe-infra
cd cafeorbe-infra && docker compose up -d
```

Luego cada servicio desde su propio repositorio. Ver el README de `cafeorbe-infra` para el orden de arranque.

## Convención de nombres

```
cafeorbe-<nombre>-service     microservicios de dominio
cafeorbe-<nombre>-gateway     capas de entrada
cafeorbe-web                  cliente
cafeorbe-contracts            contratos compartidos
cafeorbe-infra                infraestructura
```
