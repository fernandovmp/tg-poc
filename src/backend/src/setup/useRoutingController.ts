import { useContainer, useExpressServer } from 'routing-controllers';

import { Container } from 'typedi';
import { Express } from 'express';
import { HttpResponseErrorHandler } from '../middlewares/httpResponseErrorHandling';
import { TarefasController } from '../features/tarefas';

export function useRoutingController(app: Express) {
    useContainer(Container);
    return useExpressServer(app, {
        controllers: [TarefasController],
        middlewares: [HttpResponseErrorHandler],
        defaultErrorHandler: false,
    });
}
