import { IErroValidacao } from '@todo-list/shared';

export class ExcecaoErroValidacao extends Error {
    readonly errosValidacao: IErroValidacao[];
    constructor(errosValidacao?: IErroValidacao[], mensagem?: string) {
        super(mensagem);
        this.name = 'ValidationErrorExcepetion';
        this.errosValidacao = errosValidacao ?? [];
        Object.setPrototypeOf(this, ExcecaoErroValidacao.prototype);
    }
}
