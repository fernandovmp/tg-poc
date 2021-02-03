import {
    Body,
    Delete,
    Get,
    JsonController,
    NotFoundError,
    Param,
    Post,
    Put,
    Req,
    Res,
} from 'routing-controllers';

import { IDadosTarefaDto, ITarefaDto } from '@todo-list/shared';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TarefasRepositorio } from './tarefasRepositorio';
import { Request, Response } from 'express';
import { ControllerBase } from '../controllerBase';
import { validadorDadosTarefa } from './validacoes';
import { ExcecaoErroValidacao } from '../../exceptions/excecaoErroValidacao';
import { CriarTarefaCasoDeUso } from './casosDeUso/criarTarefaCasoDeUso';

@JsonController('/tarefa')
export class TarefasController extends ControllerBase {
    constructor(
        @InjectRepository() private tarefasRepositorio: TarefasRepositorio,
        private criarTarefaCasoDeUso: CriarTarefaCasoDeUso
    ) {
        super();
    }

    @Get()
    obterTodos(): Promise<ITarefaDto[]> {
        return this.tarefasRepositorio.obterTodos();
    }

    @Post()
    async criar(
        @Body() model: IDadosTarefaDto,
        @Req() request: Request,
        @Res() response: Response
    ): Promise<ITarefaDto> {
        const tarefa = await this.criarTarefaCasoDeUso.executar(model);
        return this.created(request, response, tarefa, `/tarefa/${tarefa.id}`);
    }

    @Get('/:id')
    async obterPeloId(@Param('id') id: number, @Res() response: Response) {
        const tarefa = await this.tarefasRepositorio.obterPeloId(id);
        if (!tarefa) {
            throw new NotFoundError();
        }
        return tarefa;
    }

    @Delete('/:id')
    async deletarPeloId(@Param('id') id: number, @Res() response: Response) {
        const tarefa = await this.tarefasRepositorio.obterPeloId(id);
        if (!tarefa) throw new NotFoundError();
        await this.tarefasRepositorio.deletarPeloId(id);
        return this.noContent(response);
    }

    @Put('/:id')
    async atualizarPeloId(
        @Param('id') id: number,
        @Body() model: IDadosTarefaDto,
        @Res() response: Response
    ) {
        const resultadoValidacao = await validadorDadosTarefa(model);
        if (!resultadoValidacao.valido) {
            throw new ExcecaoErroValidacao(resultadoValidacao.erros);
        }
        const tarefaNaoExiste =
            (await this.tarefasRepositorio.obterPeloId(id)) === undefined;
        if (tarefaNaoExiste) throw new NotFoundError();
        const tarefa: ITarefaDto = { id, ...model };
        await this.tarefasRepositorio.save(tarefa);
        return this.noContent(response);
    }
}
