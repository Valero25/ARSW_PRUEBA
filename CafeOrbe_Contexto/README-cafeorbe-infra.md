# cafeorbe-infra

> Infraestructura compartida: entorno local, despliegue y pipelines.

---

## Rol en la arquitectura

Sin este repositorio, cada persona nueva del equipo pierde un día averiguando cómo levantar seis servicios a la vez. Junto con `cafeorbe-contracts`, es la inversión que hace manejable la arquitectura multi-repo.

## Responsabilidades

- Docker Compose para levantar todo el sistema en local
- Configuración del broker de eventos
- Configuración de bases de datos y migraciones base
- Definiciones de despliegue por ambiente
- Pipelines de CI compartidos y plantillas reutilizables

## Fuera de alcance

Esto **no** vive aquí:

- Código de cualquier servicio
- Secretos de producción. Van en el gestor de secretos, nunca en el repositorio

## Levantar el entorno completo

```bash
git clone https://github.com/cafeorbe/cafeorbe-infra
cd cafeorbe-infra
cp .env.example .env
docker compose up -d
```

Esto levanta las dependencias compartidas: base de datos, broker de eventos y almacenamiento. Cada servicio se levanta después desde su propio repositorio.

## Orden de arranque recomendado

1. `cafeorbe-infra` (dependencias compartidas)
2. `cafeorbe-identity-service`
3. `cafeorbe-auction-service`
4. `cafeorbe-realtime-gateway`
5. El resto, en cualquier orden
6. `cafeorbe-api-gateway`
7. `cafeorbe-web`

## Prioridad de construcción

Este repositorio y `cafeorbe-contracts` deben existir **desde el Sprint 1**, antes que cualquier servicio de dominio. Son los dos que sostienen al resto.

---

Parte de **CafeOrbe** — Plataforma de Subastas de Café en Tiempo Real.
