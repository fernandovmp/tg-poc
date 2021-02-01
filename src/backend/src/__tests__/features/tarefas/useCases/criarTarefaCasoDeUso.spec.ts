import { IDadosTarefaDto, ITarefaDto } from '@todo-list/shared';

import { CriarTarefaCasoDeUso } from '../../../../features/tarefas/casosDeUso/criarTarefaCasoDeUso';
import { ExcecaoErroValidacao } from '../../../../exceptions/excecaoErroValidacao';
import { TarefasRepositorio } from '../../../../features/tarefas/tarefasRepositorio';

describe('criarTarefaCasoDeUso', () => {
    let createUseCase: CriarTarefaCasoDeUso;
    let tarefasRepositorio: TarefasRepositorio;
    beforeEach(() => {
        tarefasRepositorio = new TarefasRepositorio();
        createUseCase = new CriarTarefaCasoDeUso(tarefasRepositorio);
    });
    it('deve lançar exceção quando os dados forem inválidos', async () => {
        const invalidData: IDadosTarefaDto = {
            status: 'completo',
            titulo: '',
        };
        await expect(createUseCase.executar(invalidData)).rejects.toThrowError(
            ExcecaoErroValidacao
        );
    });

    it('deve retornar a tarefa criada com um id quando os dados forem válidos', async () => {
        const validData: IDadosTarefaDto = {
            status: 'completo',
            titulo: 'Teste',
        };
        const expcted: ITarefaDto = {
            id: 1,
            status: validData.status,
            titulo: validData.titulo,
        };
        jest.spyOn(tarefasRepositorio, 'adicionar').mockImplementation(
            (tarefa) => {
                tarefa.id = 1;
                return Promise.resolve();
            }
        );
        expect(await createUseCase.executar(validData)).toStrictEqual(expcted);
    });
});
