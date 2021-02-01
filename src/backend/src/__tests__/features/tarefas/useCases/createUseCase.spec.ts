import { IDadosTarefaDto, ITarefaDto } from '@todo-list/shared';

import { CreateUseCase } from '../../../../features/tarefas/useCases/createUseCase';
import { TarefasRepositorio } from '../../../../features/tarefas/tarefasRepositorio';
import { ValidationErrorExcepetion } from '../../../../exceptions/validationErrorException';

describe('tarefasController', () => {
    let createUseCase: CreateUseCase;
    let tarefasRepositorio: TarefasRepositorio;
    beforeEach(() => {
        tarefasRepositorio = new TarefasRepositorio();
        createUseCase = new CreateUseCase(tarefasRepositorio);
    });
    it('should throw a validation error exception when the data sended is not valid', async () => {
        const invalidData: IDadosTarefaDto = {
            status: 'completo',
            titulo: '',
        };
        await expect(createUseCase.handle(invalidData)).rejects.toThrowError(
            ValidationErrorExcepetion
        );
    });

    it('should return the created Todo with an id when send valid data', async () => {
        const validData: IDadosTarefaDto = {
            status: 'completo',
            titulo: 'Teste',
        };
        const expcted: ITarefaDto = {
            id: 1,
            status: validData.status,
            titulo: validData.titulo,
        };
        jest.spyOn(tarefasRepositorio, 'add').mockImplementation((tarefa) => {
            tarefa.id = 1;
            return Promise.resolve();
        });
        expect(await createUseCase.handle(validData)).toStrictEqual(expcted);
    });
});
