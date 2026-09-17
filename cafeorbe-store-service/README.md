# cafeorbe-store-service

> Tienda de venta directa a precio fijo.

---

## Rol en la arquitectura

Administra las ventas fuera de subasta. Comparte con el motor de subastas el concepto de lote, pero ninguna regla de negocio: uno vende a precio fijo y el otro por puja. Mantenerlos separados evita que el motor transaccional cargue con lógica de carrito y stock.

## Responsabilidades

- Creación de producto con precio y stock
- Visibilidad del producto en la vitrina
- Carrito de compras
- Finalización de la transacción
- Descuento automático de stock

## Historias que implementa

| Épica / Feature | Historia |
|---|---|
| E4 / F4.1 | Como vendedor, quiero agregar productos con precio fijo a la tienda |
| E4 / F4.1 | Como comprador, quiero comprar productos sin esperar a una subasta |

## Fuera de alcance

Esto **no** vive aquí:

- El envío — vive en `cafeorbe-shipping-service`
- Filtros de búsqueda y ficha detallada — llegan en el Release 2

## API principal

```
POST   /productos
GET    /productos
GET    /productos/{id}
POST   /carrito/items
POST   /ordenes
```

## Eventos

**Publica:** `ProductoPublicado`, `OrdenCreada`, `StockDescontado`

**Consume:** `PagoConfirmado` (para confirmar la orden), `PagoRechazado` (para reponer stock)

## Nota de alcance

Este servicio es el candidato natural a moverse al Release 2 si el alcance del MVP aprieta. Ninguna de sus historias aparece entre los requisitos de tiempo real y concurrencia que definen el MVP, y sus dos historias suman 13 puntos.

Que viva en su propio repositorio hace que sacarlo del sprint sea trivial.

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
