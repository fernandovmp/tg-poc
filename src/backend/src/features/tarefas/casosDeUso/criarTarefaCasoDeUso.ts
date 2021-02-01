import { IDadosTarefaDto, ITarefaDto } from '@todo-list/shared';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TarefasRepositorio } from '../tarefasRepositorio';
import { validadorDadosTarefa } from '../validacoes';
import { ExcecaoErroValidacao } from '../../../exceptions/excecaoErroValidacao';
import { Service } from 'typedi';

@Service()
export class CriarTarefaCasoDeUso {
    constructor(
        @InjectRepository() private tarefasRepositorio: TarefasRepositorio
    ) {}

    async executar(tarefaDto: IDadosTarefaDto): Promise<ITarefaDto> {
        const resultadoValidacao = await validadorDadosTarefa(tarefaDto);
        if (!resultadoValidacao.valido) {
            throw new ExcecaoErroValidacao(resultadoValidacao.erros);
        }
        const tarefa = { id: 0, ...tarefaDto };
        await this.tarefasRepositorio.adicionar(tarefa);
        return tarefa;
    }
}
