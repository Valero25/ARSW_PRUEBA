# cafeorbe-streaming-service

> Gestión de la transmisión en vivo de las subastas.

---

## Rol en la arquitectura

Administra las salas de transmisión y el ciclo de vida del stream. Va separado del motor de subastas por dos razones: tiene un perfil de carga distinto (consume ancho de banda y escala con espectadores, no con escrituras), y **si el video se cae, la subasta debe seguir**. El temporizador y las pujas no pueden depender de que el stream esté vivo.

## Responsabilidades

- Activación y apagado de la transmisión por parte del vendedor
- Creación de la sala asociada a una subasta
- Emisión de tokens de acceso del proveedor de video
- Estado del stream (activo, detenido, error)
- Notificación de inicio de transmisión

## Historias que implementa

| Épica / Feature | Historia |
|---|---|
| E2 / F2.1 | Como vendedor, quiero iniciar y apagar la transmisión en vivo |
| E2 / F2.1 | Como comprador, quiero unirme a la transmisión de una subasta |

## Fuera de alcance

Esto **no** vive aquí:

- El conteo de personas conectadas — lo lleva `cafeorbe-realtime-gateway`, que es quien tiene los sockets
- El temporizador y las pujas — viven en `cafeorbe-auction-service`
- La infraestructura de medios en sí

## API principal

```
POST   /transmisiones
POST   /transmisiones/{id}/iniciar
POST   /transmisiones/{id}/detener
GET    /transmisiones/{id}/token
GET    /transmisiones/{id}/estado
```

## Eventos

**Publica:** `TransmisionIniciada`, `TransmisionDetenida`

**Consume:** `SubastaProgramada`, `SubastaCerrada`

## Decisión de arquitectura: no construir el servidor de medios

Montar WebRTC propio, un SFU y transcodificación es un proyecto entero, no una historia de sprint. Este servicio **solo administra salas, tokens y estado**; el transporte de video lo provee un tercero gestionado.

Es la decisión que más riesgo le quita al MVP. Si el equipo intenta construir la infraestructura de medios, el Release 1 no sale.

## Estructura del proyecto

Arquitectura hexagonal. El dominio no conoce el framework ni la base de datos.

```
src/
├── domain/                 Entidades y reglas de negocio. Sin dependencias externas
│   ├── model/
│   └── service/
├── application/            Casos de uso. Orquesta el dominio
│   ├── port/in/            Puertos de entrada (qué puede pedirse al servicio)
│   └── port/out/           Puertos de salida (qué necesita el servicio del exterior)
└── infrastructure/         Adaptadores. Aquí sí vive el framework
    ├── adapter/in/rest/    Controladores HTTP
    ├── adapter/in/event/   Consumidores del bus de eventos
    ├── adapter/out/persistence/
    └── adapter/out/event/  Publicadores al bus
```

Regla de oro: si un import de `domain/` menciona el framework, la capa está rota.

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
