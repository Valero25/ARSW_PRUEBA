CREATE TABLE puja (
    id                  UUID PRIMARY KEY,
    subasta_id          UUID NOT NULL REFERENCES subasta (id),
    pujador_id          UUID NOT NULL,
    monto               NUMERIC(12, 2) NOT NULL,
    clave_idempotencia  VARCHAR(100) NOT NULL,
    fecha               TIMESTAMPTZ NOT NULL,
    UNIQUE (subasta_id, clave_idempotencia)
);

CREATE INDEX idx_puja_subasta ON puja (subasta_id);
