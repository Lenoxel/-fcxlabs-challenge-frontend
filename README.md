# FCxLabs Challenge

## Descrição

O projeto foi construído utilizando Angular, um framework construído em javascript (typescript), tomando proveito das libs e built-ins que o mesmo fornece para implementar o sistema proposto.

Considerando a pasta principal (src/app), a estrutura do projeto é a seguinte:

1 - components: possui os componentes do projeto (tabs).

2 - dto: objetos de transferência de dados, ou seja, interfaces que representam ("tipam") os objetos recebidos e enviados do front para o back e vice-versa.

3 - enums: enumeradores.

4 - models: interfaces utilizadas para "tipar" alguns objetos, mas não são dtos.

5 - pages: páginas da aplicação que podem ser acessadas pelos usuários.

6 - services: serviços que implementam o design pattern singleton, fazendo com que qualquer serviço possa ser injetado (DI) por qualquer outra classe de forma compartilhada. 

7 - app*: componente de entrada, para onde o index.html redireciona quando o projeto é inicializado, além de ser o ponto inicial de todas as rotas do projeto.

## Requisitos para rodar a aplicação

Para rodar o projeto localmente, é necessário utilizar: NPM e Angular CLI.

Na minha máquina, as versões utilizadas durante o desenvolvimento foram: NPM - 8.3.1; Angular CLI: 13.1.3.

## Instalação e execução da aplicação

Antes de rodar o comando abaixo, certifique-se de deixar livre a porta 4200, no domínio localhost, que será utilizada para servir a aplicação.

Na pasta raiz do projeto, execute:

```bash
$ npm i
$ npm run start
```