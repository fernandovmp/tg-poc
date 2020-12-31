import { EntityRepository, Repository } from 'typeorm';

import { EntidadeTarefa } from '../../entities/tarefa';
import { ITarefaDto } from '@todo-list/shared';
import { Service } from 'typedi';

@Service()
@EntityRepository(EntidadeTarefa)
export class TarefasRepositorio extends Repository<ITarefaDto> {
    public getAll() {
        return this.createQueryBuilder()
            .select('t')
            .from(EntidadeTarefa, 't')
            .getMany();
    }

    public async add(tarefa: ITarefaDto) {
        await this.insert(tarefa);
    }

    public getById(id: number) {
        return this.findOne(id);
    }

    public deleteById(id: number) {
        return this.delete(id);
    }
}
