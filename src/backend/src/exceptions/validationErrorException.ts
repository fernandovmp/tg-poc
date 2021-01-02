import { IErroValidacao } from '@todo-list/shared';

export class ValidationErrorExcepetion extends Error {
    readonly validationErrors: IErroValidacao[];
    constructor(validationErrors?: IErroValidacao[], message?: string) {
        super(message);
        this.name = 'ValidationErrorExcepetion';
        this.validationErrors = validationErrors ?? [];
        Object.setPrototypeOf(this, ValidationErrorExcepetion.prototype);
    }
}
