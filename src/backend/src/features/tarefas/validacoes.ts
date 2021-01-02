import * as yup from 'yup';

import { IDadosTarefaDto, IErroValidacao } from '@todo-list/shared';

interface IResultadoValidacao {
    valido: boolean;
    erros?: IErroValidacao[];
}

export const validadorDadosTarefa = criarValidador<IDadosTarefaDto>(
    yup.object().shape({
        status: yup
            .string()
            .required('status é obrigatório')
            .oneOf(
                ['completo', 'incompleto'],
                'status deve ser "completo" ou "incompleto"'
            ),
        titulo: yup
            .string()
            .required('titulo é obrigatório')
            .max(20, 'titulo deve ter no máximo 20 caractéres'),
    })
);

function criarValidador<T>(validador: yup.SchemaOf<T>) {
    return async (valor: T) => {
        try {
            await validador.validate(valor, {
                abortEarly: false,
            });
            return criarResultadoDeValidacao(true);
        } catch (error) {
            return criarResultadoDeValidacao(false, error);
        }
    };
}

function criarResultadoDeValidacao(
    valido: boolean,
    erros?: yup.ValidationError
): IResultadoValidacao {
    return {
        valido,
        erros: mapErrors(erros?.errors ?? [], erros?.inner ?? []),
    };
}

function mapErrors(messages: string[], errors: yup.ValidationError[]) {
    const size = Math.min(messages.length, errors.length);
    const mappedErrors: IErroValidacao[] = [];
    for (let i: number = 0; i < size; i++) {
        mappedErrors.push({
            campo: errors[i].path ?? '',
            erro: errors[i].type ?? '',
            mensagem: messages[i],
        });
    }
    return mappedErrors;
}
