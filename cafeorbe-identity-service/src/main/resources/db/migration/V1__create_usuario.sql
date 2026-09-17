CREATE TABLE usuario (
    id              UUID PRIMARY KEY,
    correo          VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    residencia      VARCHAR(255) NOT NULL,
    celular         VARCHAR(30)  NOT NULL,
    codigo_postal   VARCHAR(20)  NOT NULL,
    rol             VARCHAR(30)  NOT NULL,
    fecha_registro  TIMESTAMPTZ  NOT NULL
);

CREATE INDEX idx_usuario_rol ON usuario (rol);
