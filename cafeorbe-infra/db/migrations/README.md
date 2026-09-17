# Migraciones base

Scripts `.sql` en esta carpeta se ejecutan una sola vez, en orden alfabético, cuando el volumen de `postgres` se crea por primera vez (mecanismo nativo de la imagen `postgres` para `/docker-entrypoint-initdb.d`).

Uso previsto: crear una base de datos por servicio de dominio (`identity`, `auction`, `streaming`, `store`, `shipping`), no una base compartida. Cada servicio administra sus propias migraciones de esquema (Flyway o Liquibase) desde su propio repositorio; aquí solo vive el bootstrap de las bases.

Convención sugerida de nombre: `01-create-databases.sql`.
