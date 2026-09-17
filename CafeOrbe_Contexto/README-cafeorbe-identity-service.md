# cafeorbe-identity-service

> Identidad, autenticación y roles de CafeOrbe.

---

## Rol en la arquitectura

Único servicio que almacena contraseñas y datos personales. Emite los JWT que el resto del sistema consume. Está aislado para limitar el alcance de una eventual brecha de seguridad: endurecer este repositorio no frena el desarrollo de los demás.

## Responsabilidades

- Registro de usuario con correo, contraseña, residencia, celular, nombre completo, código postal y rol
- Login y logout con emisión y revocación de token
- Gestión de roles (vendedor, comprador, administrador)
- Datos del perfil y canales de contacto
- Resolución del dashboard según el rol

## Historias que implementa

| Épica / Feature | Historia |
|---|---|
| E1 / F1.1 | Como usuario, quiero registrarme con mis datos y rol |
| E1 / F1.1 | Como usuario, quiero iniciar y cerrar sesión |
| E1 / F1.2 | Como usuario, quiero un dashboard según mi rol |

## Fuera de alcance

Esto **no** vive aquí:

- La validación del token en cada request — eso lo hace `cafeorbe-api-gateway`
- El contenido del dashboard — cada servicio expone sus propios datos

## API principal

```
POST   /auth/registro
POST   /auth/login
POST   /auth/logout
GET    /usuarios/me
GET    /usuarios/{id}/rol
```

## Eventos

**Publica:** `UsuarioRegistrado`, `RolAsignado`

**Consume:** ninguno. Es la raíz de la cadena.

## Seguridad

Este repositorio tiene reglas más estrictas que el resto:

- Contraseñas con hash y salt. Nunca reversible, nunca en logs
- Los secretos de firma del JWT viven en el gestor de secretos, jamás en el repositorio
- Revisión obligatoria de pull request, sin excepciones
- Cualquier cambio en la lógica de tokens requiere revisión de dos personas

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
