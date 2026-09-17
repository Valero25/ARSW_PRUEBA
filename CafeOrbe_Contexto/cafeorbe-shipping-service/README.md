# cafeorbe-shipping-service

> Estado del envío y cálculo del costo logístico.

---

## Rol en la arquitectura

Administra el seguimiento operativo del producto hasta el cliente final. En el MVP el estado se actualiza manualmente; en el Release 3 se automatiza contra la API de la transportadora. Es el servicio que más va a cambiar, y separarlo hace que esa reescritura no toque nada más.

## Responsabilidades

- Estados del envío: Pendiente, Enviado, Recibido
- Cálculo del costo estimado de envío desde el Eje Cafetero
- Consulta del estado por parte del comprador

## Historias que implementa

| Épica / Feature | Historia |
|---|---|
| E4 / F4.3 | Como comprador, quiero ver el estado de mi envío y el valor aproximado desde el Eje Cafetero |

## Fuera de alcance

Esto **no** vive aquí:

- La integración con la transportadora — llega en el Release 3
- La generación de guías — llega en el Release 3
- La gestión de incidencias de entrega — llega en el Release 3

## API principal

```
POST   /envios
GET    /envios/{id}
PATCH  /envios/{id}/estado
GET    /envios/cotizar
```

## Eventos

**Publica:** `EnvioCreado`, `EnvioActualizado`, `EnvioEntregado`

**Consume:** `PagoConfirmado`

## Nota sobre el Release 3

En el MVP el estado del envío lo actualiza el vendedor a mano. La evolución del Release 3 reemplaza esa actualización manual por sincronización automática contra la transportadora, con historial de tracking y reintento ante fallo de la API.

Diseñar el modelo de estados pensando en esa transición: los estados del MVP deben ser un subconjunto de los que reportará la transportadora.

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
