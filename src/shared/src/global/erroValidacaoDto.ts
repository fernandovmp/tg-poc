import { IErroDto } from './erroDto';

export interface IErroValidacao {
    erro: string;
    mensagem: string;
    campo: string;
}

export interface IErroValidacaoDto extends IErroDto {
    erros: IErroValidacao[];
}
