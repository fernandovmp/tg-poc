import { IDadosTarefaDto, ITarefaDto } from '@todo-list/shared';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TarefasRepositorio } from '../tarefasRepositorio';
import { validadorDadosTarefa } from '../validacoes';
import { ValidationErrorExcepetion } from '../../../exceptions/validationErrorException';
import { Service } from 'typedi';

@Service()
export class CreateUseCase {
    constructor(
        @InjectRepository() private tarefasRepositorio: TarefasRepositorio
    ) {}

    async handle(tarefaDto: IDadosTarefaDto): Promise<ITarefaDto> {
        const resultadoValidacao = await validadorDadosTarefa(tarefaDto);
        if (!resultadoValidacao.valido) {
            throw new ValidationErrorExcepetion(resultadoValidacao.erros);
        }
        const tarefa = { id: 0, ...tarefaDto };
        await this.tarefasRepositorio.add(tarefa);
        return tarefa;
    }
}
