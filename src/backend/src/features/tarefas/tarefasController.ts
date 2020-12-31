import {
    Body,
    Delete,
    Get,
    JsonController,
    NotFoundError,
    Param,
    Post,
    Req,
    Res,
} from 'routing-controllers';

import { IDadosTarefaDto, ITarefaDto } from '@todo-list/shared';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TarefasRepositorio } from './tarefasRepositorio';
import { Request, Response } from 'express';
import { ControllerBase } from '../controllerBase';

@JsonController('/todos')
export class TarefasController extends ControllerBase {
    constructor(
        @InjectRepository() private tarefasRepositorio: TarefasRepositorio
    ) {
        super();
    }

    @Get()
    getAll(): Promise<ITarefaDto[]> {
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
        return this.created(request, response, tarefa, `/todos/${tarefa.id}`);
    }

    @Get('/:id')
    async getById(@Param('id') id: number, @Res() response: Response) {
        const tarefa = await this.tarefasRepositorio.getById(id);
        if (!tarefa) {
            throw new NotFoundError();
        }
        return tarefa;
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number, @Res() response: Response) {
        const tarefa = await this.tarefasRepositorio.getById(id);
        if (!tarefa) throw new NotFoundError();
        await this.tarefasRepositorio.deleteById(id);
        return this.noContent(response);
    }
}
