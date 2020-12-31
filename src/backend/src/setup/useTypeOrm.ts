import { createConnection, useContainer } from 'typeorm';

import { Container } from 'typedi';
import { EntidadeTarefa } from '../entities/tarefa';
import configuration from './configuration';

export function useTypeOrm() {
    useContainer(Container);
    return createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres1234',
        database: 'TodoList',
        entities: [EntidadeTarefa],
        synchronize: false,
        logging: false,
    });
}
