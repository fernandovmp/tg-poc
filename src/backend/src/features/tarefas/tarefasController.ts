import { Body, Get, JsonController, Post, Req, Res } from 'routing-controllers';

import { IDadosTarefaDto, ITarefaDto } from '@todo-list/shared';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TarefasRepositorio } from './tarefasRepositorio';
import { Request, Response } from 'express';

@JsonController('/todos')
export class TarefasController {
    constructor(
        @InjectRepository() private tarefasRepositorio: TarefasRepositorio
    ) {}

    @Get()
    getById(): Promise<ITarefaDto[]> {
        return this.tarefasRepositorio.getAll();
    }

    @Post()
    async create(
        @Body() model: IDadosTarefaDto,
        @Req() request: Request,
        @Res() response: Response
    ): Promise<ITarefaDto> {
        const tarefa = { id: 0, ...model };
        await this.tarefasRepositorio.add(tarefa);
        response.status(201);
        response.location(
            `${request.protocol + '://' + request.get('host')}/todos/${
                tarefa.id
            }`
        );
        return tarefa;
    }
}
