# cafeorbe-auction-service

> Motor de subastas en tiempo real. El corazón de CafeOrbe.

---

## Rol en la arquitectura

Es el `auction-core` de la arquitectura y el único servicio con concurrencia real. Contiene el temporizador, la recepción de pujas simultáneas, el cálculo del líder, la regla de anti-sniping y el cierre automático.

**Por qué el temporizador y las pujas viven juntos:** la regla de anti-sniping obliga a leer el estado del temporizador y extenderlo en la **misma transacción** en la que se registra la puja. Separarlos convertiría eso en una transacción distribuida en el camino más crítico del sistema: dos pujas simultáneas en el segundo 29 podrían extender el tiempo dos veces, o ninguna.

## Responsabilidades

- Creación y publicación del lote con su ficha técnica
- Programación y activación de la subasta
- Temporizador con deadline absoluto del lado del servidor
- Recepción concurrente de pujas con valores predeterminados
- Cálculo y publicación del líder actual
- Regla de anti-sniping: extensión automática del tiempo
- Cierre automático al llegar a cero y anuncio del ganador

## Historias que implementa

| Épica / Feature | Historia |
|---|---|
| E2 / F2.2 | Como vendedor, quiero programar la subasta con la ficha técnica del lote |
| E2 / F2.2 | Como vendedor, quiero iniciar el temporizador y habilitar las pujas |
| E2 / F2.2 | Como sistema, quiero cerrar la subasta al llegar a cero y mostrar al ganador |
| E3 / F3.1 | Como comprador, quiero pujar con botones de valores predeterminados |
| E3 / F3.1 | Como sistema, quiero mostrar el líder de la puja en tiempo real |
| E3 / F3.1 | Como sistema, quiero aplicar la regla anti-sniping |

## Fuera de alcance

Esto **no** vive aquí:

- La transmisión de video — vive en `cafeorbe-streaming-service`
- Las conexiones WebSocket y el fan-out — viven en `cafeorbe-realtime-gateway`
- El conteo de espectadores — lo lleva `cafeorbe-realtime-gateway`

## API principal

```
POST   /lotes
GET    /lotes/{id}
POST   /subastas
POST   /subastas/{id}/iniciar
POST   /subastas/{id}/pujas
GET    /subastas/{id}/estado
```

## Eventos

**Publica:** `SubastaProgramada`, `SubastaIniciada`, `PujaRegistrada`, `TiempoExtendido`, `SubastaCerrada`, `GanadorDeclarado`

**Consume:** `UsuarioRegistrado` (para validar el rol del vendedor)

## Reglas técnicas no negociables

**El temporizador es una fecha, no un contador.** El servidor guarda un `deadline` absoluto y lo envía junto con su hora actual. El navegador solo calcula la diferencia y pinta. Si se envía "quedan 30 segundos", cada cliente tendrá un reloj distinto por latencia y alguien pujará creyendo que le quedaba tiempo. La verdad del cierre siempre la tiene el servidor.

**Las pujas necesitan escritura condicional.** El patrón es una actualización que solo prospera si el monto nuevo supera al actual:

```sql
UPDATE subasta SET monto_actual = :nuevo, lider_id = :usuario
WHERE id = :subasta AND monto_actual < :nuevo
```

Nunca leer, comparar en memoria y escribir. Entre la lectura y la escritura cabe otra puja.

**Toda puja lleva clave de idempotencia.** Un comprador nervioso hace doble clic y un reintento de red duplica el envío. Sin clave de idempotencia, se registran dos pujas.

**Anti-sniping y registro de puja, misma transacción.** Si entra una puja en los últimos 30 segundos, se extiende el deadline (por ejemplo +10 segundos) de forma atómica con el registro de la oferta.

## Definition of Done reforzada

Además de la DoD general, en este repositorio:

- **Prueba de concurrencia obligatoria:** mínimo 100 pujas simultáneas sin pérdida ni duplicado
- Latencia de propagación de puja medida y por debajo de 500 ms
- Probado el cierre con pujas llegando exactamente en el límite

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
