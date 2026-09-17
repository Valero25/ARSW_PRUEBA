CREATE TABLE subasta (
    id           UUID PRIMARY KEY,
    lote_id      UUID NOT NULL REFERENCES lote (id),
    vendedor_id  UUID NOT NULL,
    monto_actual NUMERIC(12, 2) NOT NULL,
    lider_id     UUID,
    deadline     TIMESTAMPTZ,
    estado       VARCHAR(20) NOT NULL
);

CREATE INDEX idx_subasta_estado_deadline ON subasta (estado, deadline);
