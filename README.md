Manual Básico de Execução dos Testes

Pré requisitos: Certifique-se de que todas as dependências do cypress estejam instaladas antes de executar os comandos.
Ao clonar o repositório execute o comando: "npm install cypress --save-dev" para que o cypress seja instalado.

Branch atualizada: main

1. Testes de API:

   - Para executar os testes da API via interface:
     npx cypress open --config-file cypress.api.config.js

   - Para executar os testes da API em modo headless (sem interface):
     npx cypress run --config-file cypress.api.config.js

2. Testes de Frontend:

   - Para executar os testes de frontend via interface:
     npx cypress open

   - Para executar os testes de frontend em modo headless (sem interface):
     npx cypress run
