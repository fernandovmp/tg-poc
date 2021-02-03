CREATE TABLE migrations (
    id SERIAL NOT NULL,
    timestamp bigint NOT NULL,
    name character varying NOT NULL,
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id)
);

CREATE TYPE tarefa_status_enum AS ENUM('incompleto', 'completo');
CREATE TABLE tarefa (
    id serial NOT NULL,
    titulo varchar(20) NOT NULL,
    "status" tarefa_status_enum NOT NULL,
    CONSTRAINT "PK_df7268dfad5b4b665bcee2ae8b5" PRIMARY KEY (id)
);
INSERT INTO migrations("timestamp", "name") VALUES (1609342495733, 'ConfigurarBancoDeDados1609342495733');
