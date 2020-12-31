import 'reflect-metadata';

import { createConnection, useContainer as typeOrmUseContainer } from 'typeorm';
import express, { json } from 'express';
import {
    useContainer as routingControllerUseContainer,
    useExpressServer,
} from 'routing-controllers';

import { Container } from 'typedi';
import { EntidadeTarefa } from './entities/tarefa';
import { HttpResponseErrorHandler } from './middlewares/httpResponseErrorHandling';
import { TarefasController } from './features/tarefas';
import YAML from 'yamljs';
import path from 'path';
import redoc from 'redoc-express';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(json());

const openApiPath = path.resolve(__dirname, './wwwroot/docs/openapi.yaml');
const openApiUri = '/docs/openapi.yaml';
const openApiDocs = YAML.load(openApiPath);

app.get(openApiUri, (req, res) => {
    res.sendFile(openApiPath);
});
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocs));
app.use(
    '/docs/redoc',
    redoc({
        specUrl: openApiUri,
        title: 'API Docs',
    })
);

typeOrmUseContainer(Container);
createConnection({
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
routingControllerUseContainer(Container);
useExpressServer(app, {
    controllers: [TarefasController],
    middlewares: [HttpResponseErrorHandler],
    defaultErrorHandler: false,
});

app.listen(3030);
