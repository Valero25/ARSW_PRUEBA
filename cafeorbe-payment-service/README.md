# cafeorbe-payment-service

> Liquidación, comisiones y dispersión de fondos.

---

## Rol en la arquitectura

El único servicio que toca dinero. Está aislado para poder aplicarle una Definition of Done reforzada sin frenar a los demás, y para que el alcance de una eventual auditoría o certificación PCI sea este repositorio y nada más.

## Responsabilidades

- Cálculo de la comisión por unidad vendida y por envío
- Cobro al comprador a través de la pasarela
- Dispersión de fondos al vendedor
- Bitácora inmutable de auditoría de toda operación monetaria
- Manejo de pagos rechazados y timeouts de pasarela

## Historias que implementa

| Épica / Feature | Historia |
|---|---|
| E4 / F4.2 | Como sistema, quiero calcular la comisión por unidad vendida y por envío |
| E4 / F4.2 | Como sistema, quiero cobrar al comprador y pagar al vendedor |

## Fuera de alcance

Esto **no** vive aquí:

- El KYC del vendedor — llega en el Release 2, en este mismo repositorio
- El motor de reembolsos — llega en el Release 2
- El estado de cuenta del vendedor — llega en el Release 2

## API principal

```
POST   /cobros
GET    /cobros/{id}
POST   /dispersiones
GET    /comisiones/calcular
GET    /transacciones/{id}/auditoria
```

## Eventos

**Publica:** `PagoConfirmado`, `PagoRechazado`, `ComisionCalculada`, `FondosDispersados`

**Consume:** `GanadorDeclarado`, `OrdenCreada`

## Definition of Done reforzada

Además de la DoD general, ninguna historia de este repositorio se considera terminada sin:

- Toda operación monetaria registrada en una bitácora **inmutable** de auditoría
- Probado el camino de fallo: pago rechazado, timeout de pasarela, doble envío
- Los montos cuadran **al centavo** entre el cobro, la comisión y la dispersión
- Ningún monto se representa con punto flotante. Usar tipos decimales exactos
- Toda operación de cobro lleva clave de idempotencia

## Control de acceso

- Revisión de pull request obligatoria por dos personas
- Credenciales de la pasarela solo en el gestor de secretos
- Historial de commits limpio: nunca reescribir la historia de este repositorio

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
