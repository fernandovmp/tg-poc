import { createConnection, useContainer } from 'typeorm';

import { Container } from 'typedi';

export function useTypeOrm() {
    useContainer(Container);
    return createConnection();
}
