import { EntitySchema } from 'typeorm';
import { ITarefaDto } from '@todo-list/shared';

export const EntidadeTarefa = new EntitySchema<ITarefaDto>({
    name: 'tarefa',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        titulo: {
            type: String,
        },
        status: {
            type: String,
            enum: ['incompleto', 'completo'],
        },
    },
});
