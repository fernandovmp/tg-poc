import {
    ExpressErrorMiddlewareInterface,
    Middleware,
    NotFoundError,
} from 'routing-controllers';
import { Request, Response } from 'express';

import { ExcecaoErroValidacao } from '../exceptions/excecaoErroValidacao';
import { IErroValidacaoDto } from '@todo-list/shared';

@Middleware({ type: 'after' })
export class HttpResponseErrorHandler
    implements ExpressErrorMiddlewareInterface {
    error(
        error: any,
        request: Request,
        response: Response,
        next: (err: any) => any
    ) {
        if (error instanceof NotFoundError) {
            response.status(error.httpCode).send(undefined);
        } else if (error instanceof ExcecaoErroValidacao) {
            const responseBody: IErroValidacaoDto = {
                status: 400,
                mensagem: 'Ocorreu um mais erros de validação',
                erros: error.errosValidacao,
            };
            response.status(400);
            response.send(responseBody);
        } else if (error.httpCode) {
            response.status(error.httpCode).send(undefined);
        }
        next(error);
    }
}
