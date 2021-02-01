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
        erros: mapearErros(erros?.errors ?? [], erros?.inner ?? []),
    };
}

function mapearErros(mensagens: string[], erros: yup.ValidationError[]) {
    const tamanho = Math.min(mensagens.length, erros.length);
    const errosMapeados: IErroValidacao[] = [];
    for (let i: number = 0; i < tamanho; i++) {
        errosMapeados.push({
            campo: erros[i].path ?? '',
            erro: erros[i].type ?? '',
            mensagem: mensagens[i],
        });
    }
    return errosMapeados;
}
