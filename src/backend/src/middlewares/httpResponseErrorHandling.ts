import {
    ExpressErrorMiddlewareInterface,
    Middleware,
    NotFoundError,
} from 'routing-controllers';
import { Request, Response } from 'express';

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
        } else if (error.httpCode) {
            response.status(error.httpCode).send(undefined);
        }
        next(error);
    }
}
