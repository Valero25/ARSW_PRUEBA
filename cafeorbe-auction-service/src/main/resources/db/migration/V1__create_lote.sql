CREATE TABLE lote (
    id                UUID PRIMARY KEY,
    vendedor_id       UUID NOT NULL,
    nombre            VARCHAR(255) NOT NULL,
    origen            VARCHAR(255),
    variedad          VARCHAR(255),
    proceso_beneficio VARCHAR(255),
    puntaje_catacion  INTEGER
);

CREATE INDEX idx_lote_vendedor ON lote (vendedor_id);
