# FCxLabs Challenge
<!-- 
## Descrição

O projeto foi construído utilizando o framework Nest.js, tomando proveito das libs e built-ins que o mesmo fornece para resolver os desafios propostos e implementar toda a API Restful.

A API Restful foi arquiteturada no modelo de microservices, em um monorepo, com o objetivo de manter a alta performance em cada domínio da aplicação, possibilitando que cada microservice escale individualmente.

Os domínios da aplicação são:

1 - auth: Responsável pela autenticação e autorização da aplicação.

2 - client: Responsável pelo gerenciamento e visualização (CRUD) dos clientes.

3 - client-product: Responsável por salvar e manter a lista de produtos favoritos de um cliente.

4 - user: Responsável pela criação dos usuários que têm acesso à aplicação, provendo a autenticação na mesma e a autorização na consulta dos demais endpoints.

## Requisitos para rodar a aplicação

Para rodar o projeto localmente, é necessário utilizar: Docker, Docker-Compose, Node e NPM.

Na minha máquina, as versões utilizadas durante o desenvolvimento foram: Docker - 20.10.12; docker-compose - 1.26.0; Node - 14.8.2; NPM - 6.14.15.

## Instalação e execução da aplicação

Antes de rodar o comando abaixo, certifique-se de deixar as portas que serão utilizadas para servir a aplicação livres: 3000, 3001, 3002, 3003, 3308, 3309 e 27017, sendo todas no domínio localhost.

Na pasta raiz do projeto, execute:

```bash
# Caso deseje acompanhar os servidores pelo terminal, não utilizar o alias "-d"
$ docker-compose up -d
```

## Testar a aplicação

Para fazer as chamadas nos endpoints da aplicação, sugiro a importação do arquivo "luizalabs_challenge.postman_collection.json", que está na pasta raiz do projeto, para dentro do Postman. Esse arquivo contém todas as chamadas possíveis da API, com alguns exemplos já inseridos.

# Sobre o Nest.js

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->