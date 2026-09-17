# cafeorbe-contracts

> Contratos compartidos: esquemas de eventos y DTOs.

---

## Rol en la arquitectura

**El repositorio que sostiene la arquitectura multi-repo.** En multi-repo, el mayor riesgo es que un servicio cambie el formato de un evento y otro se entere en producción. Con contratos versionados, el cambio es explícito: alguien sube la versión y los consumidores actualizan cuando pueden.

Sin este repositorio, seis servicios y un equipo pequeño se vuelve muy doloroso alrededor del cuarto sprint.

## Responsabilidades

- Esquemas de todos los eventos del bus
- DTOs compartidos entre servicios
- Versionado semántico de cada contrato
- Publicación como paquete consumible por los demás repositorios

## Fuera de alcance

Esto **no** vive aquí:

- Lógica de negocio de cualquier tipo
- Entidades de dominio. Un DTO no es una entidad
- Utilidades genéricas. Esto no es un repositorio de 'common'

## API principal

```
eventos/
├── identity/    UsuarioRegistrado, RolAsignado
├── auction/     SubastaProgramada, SubastaIniciada, PujaRegistrada,
│                TiempoExtendido, SubastaCerrada, GanadorDeclarado
├── streaming/   TransmisionIniciada, TransmisionDetenida
├── store/       ProductoPublicado, OrdenCreada, StockDescontado
└── shipping/    EnvioCreado, EnvioActualizado, EnvioEntregado
```

## Regla de compatibilidad

**Agregar un campo opcional es un cambio menor.** Se sube la versión menor y los consumidores no se enteran.

**Quitar o renombrar un campo es un cambio mayor.** Requiere subir la versión mayor, anunciarlo al equipo y mantener la versión anterior viva hasta que todos los consumidores migren.

Nunca cambiar el significado de un campo existente sin renombrarlo. Es el error más difícil de detectar y el que más caro sale.

## Cómo consumirlo

Los servicios lo declaran como dependencia con versión fija. Nunca con rango abierto: una actualización silenciosa de contrato es exactamente el problema que este repositorio existe para evitar.

---

Parte de **CafeOrbe** — Plataforma de Subastas de Café en Tiempo Real.
