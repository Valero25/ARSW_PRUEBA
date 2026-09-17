# cafeorbe-web

> Cliente web de CafeOrbe. Único frontend del MVP.

---

## Rol en la arquitectura

SPA que consume el API gateway por REST y el realtime gateway por WebSocket. El nombre `-web` en lugar de `-frontend` deja espacio limpio para un `cafeorbe-mobile` más adelante sin renombrar nada.

## Responsabilidades

- Registro, login y dashboard por rol
- Publicación del lote y programación de la subasta
- Sala de subasta en vivo: video, temporizador, botones de puja, líder y contador de conectados
- Vitrina de la tienda y compra directa
- Consulta del estado del envío

## Fuera de alcance

Esto **no** vive aquí:

- Cualquier regla de negocio. El front pinta, no decide
- El cálculo del tiempo restante como fuente de verdad. El servidor manda el deadline; el front solo resta
- Validaciones que sustituyan a las del backend. Las de front son de experiencia, no de seguridad

## Conexiones

| Destino | Protocolo | Para qué |
|---|---|---|
| `cafeorbe-api-gateway` | REST | Todo lo transaccional |
| `cafeorbe-realtime-gateway` | WebSocket | Pujas, líder, temporizador, conteo de conectados |
| Proveedor de video | SDK del proveedor | Reproducción del stream |

## Reglas de la sala de subasta

**El temporizador se calcula, no se recibe.** El servidor envía un `deadline` absoluto y su hora actual. El front calcula el desfase una vez y desde ahí pinta la cuenta regresiva localmente. Nunca pedir el tiempo restante en un bucle.

**Reconexión sin pérdida.** Al reconectar el WebSocket, pedir el estado completo de la sala (tiempo restante, líder actual, monto, conectados) antes de volver a pintar. Un comprador con conexión intermitente no puede perder la subasta por un corte de red.

**Botones de puja con bloqueo optimista.** Deshabilitar el botón al hacer clic hasta recibir confirmación, y enviar siempre la clave de idempotencia. Evita la doble puja por doble clic.

## Estructura del proyecto

```
src/
├── pages/            Vistas por ruta
├── features/         Lógica por dominio (subasta, tienda, perfil)
├── components/       UI reutilizable
├── services/         Clientes HTTP y WebSocket
└── hooks/            Estado compartido
```

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
