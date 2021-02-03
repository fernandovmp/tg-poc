# Como rodar

### Usando docker

Requisitos

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

Ao executar o seguinte comando, o banco de dados e o backend ficaram disponiveis

```
docker-compose up -d
```

A API ficará disponivel em `http://localhost:3030`

Para interromper a execução, execute:

```
docker-compose down
```

### Sem docker

Requisitos

-   [NodeJS](https://nodejs.org)
-   [Yarn](https://yarnpkg.com)
-   [PostgreSQL](https://www.postgresql.org/)

Instale as dependências do projeto

```
yarn install
```

Copie o arquivo `.env.example` e de o nome de `.env`
depois preencha as variáveis de acordo com o exemplo em `.env.example`

Para criar as tabelas no banco de dados execute o script na pasta [database](./database)
ou execute os seguintes comandos:

```
yarn workspace @todo-list/backend build
yarn workspace @todo-list/backend typeorm migration:run
```

então execute

```
yarn workspace @todo-list/backend start
```

A API ficará disponível na porta especificado no arquivo `.env`

## Documentação OpenAPI

A documentação da API pode ser acessada em uma das duas URI

-   `/docs/redoc`
-   `/docs/swagger`

## Comandos do backend

Você pode executar comandos no projeto do backend usando `yarn workspace @todo-list/backend <comando>`
Os comandos disponíveis são:

-   `build`
    Compila os arquivos typescript em arquivos javascript
-   `start:dev`
    Executa a aplicação e fica escutando por mudanças nos arquivos na pasta `src`
-   `start`
    Executa a aplicação
-   `test`
    Executa os testes de unidade
