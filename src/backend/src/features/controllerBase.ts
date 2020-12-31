import { Request, Response } from 'express';

export type NoContentResponse = null;

export abstract class ControllerBase {
    created<T>(
        request: Request,
        response: Response,
        object: T,
        uri: number | string
    ) {
        response.status(201);
        response.location(`${request.protocol}://${request.get('host')}${uri}`);
        return object;
    }

    noContent(response: Response): NoContentResponse {
        response.status(204);
        return null;
    }
}
