-- Proyección local alimentada por el evento UsuarioRegistrado del bus.
-- No es la fuente de verdad de usuarios — esa vive en identity-service.
CREATE TABLE vendedor_proyeccion (
    usuario_id UUID PRIMARY KEY,
    rol        VARCHAR(30) NOT NULL
);
