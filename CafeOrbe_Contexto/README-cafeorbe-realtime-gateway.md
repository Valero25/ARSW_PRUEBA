# cafeorbe-realtime-gateway

> Capa de tiempo real. Conexiones WebSocket y fan-out de pujas.

---

## Rol en la arquitectura

**La única capa con estado del sistema.** Las conexiones WebSocket se quedan pegadas a la instancia donde se abrieron; los servicios de dominio son intercambiables. Concentrar aquí todo lo que 'se pega' a una instancia es lo que permite que los seis servicios sean stateless y escalables.

Si un espectador tiene su socket en la instancia 1 y la puja llega a la instancia 2, la instancia 2 no tiene forma de avisarle. Este servicio resuelve eso suscribiéndose al canal pub/sub de cada sala.

## Responsabilidades

- Mantener las conexiones WebSocket abiertas
- Saber qué usuario está en qué sala
- Suscribirse al canal pub/sub de cada sala activa
- Fan-out: recibir un evento y escribirlo en los N sockets de la sala
- Detectar desconexiones y mantener el conteo de espectadores
- Reenviar el estado completo cuando alguien se reconecta a mitad de subasta

## Historias que implementa

| Épica / Feature | Historia |
|---|---|
| E2 / F2.1 | Como comprador, quiero ver el número de personas conectadas |

## Fuera de alcance

Esto **no** vive aquí:

- La validación de la puja — la hace `cafeorbe-auction-service`. Aquí solo se transporta el resultado
- El cálculo del líder o del tiempo restante
- Cualquier persistencia de negocio. El estado aquí es efímero

## API principal

```
WS   /salas/{subastaId}

Mensajes salientes:
  estado_inicial     estado completo al conectar o reconectar
  puja_registrada    monto, pujador, nuevo líder
  tiempo_extendido   nuevo deadline por anti-sniping
  conectados         número de espectadores
  subasta_cerrada    ganador y monto final
```

## Eventos

**Consume del bus:** `PujaRegistrada`, `TiempoExtendido`, `SubastaCerrada`, `TransmisionIniciada`

**Publica:** ninguno hacia el dominio. Es un consumidor puro que traduce eventos a mensajes de socket.

## El problema del fan-out

Una sola puja entra al sistema y salen 40 mensajes, en menos de 500 ms. Ese es el trabajo de este servicio.

```
1 puja → auction-service → canal pub/sub → gateway 1 (14 sockets)
                                        → gateway 2 (13 sockets)
                                        → gateway 3 (13 sockets)
```

## Reglas técnicas

**El conteo de conectados va con freno.** Con decenas de personas entrando y saliendo, emitir un mensaje por cada cambio satura el canal justo cuando más se necesita para las pujas. Agregar y emitir cada 2 o 3 segundos.

**Estado completo al reconectar.** Un comprador en zona rural con conexión intermitente debe recuperar tiempo restante, líder y monto exactos al reconectarse.

**Backpressure.** Si un cliente lento no drena su socket, no puede bloquear el fan-out del resto. Descartar mensajes intermedios para ese cliente y enviarle el estado completo cuando se recupere.

## Nota de planificación

A diferencia del API gateway, este **no se puede posponer**. Si el sprint 2 entrega streaming y el sprint 3 entrega pujas, para el sprint 3 tiene que existir.

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
