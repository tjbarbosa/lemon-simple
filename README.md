# Projeto de Elegibilidade de Clientes

Este projeto verifica a elegibilidade de clientes com base em vários critérios.

## Pre requisiots

- Docker & Docker-compose
- Node.js v20

## Executar

### Desenvolvimento
- execute `docker-compose up --build app`

### Deploy
- execute `docker build -t lemon-simple-prod . && docker run -d -p 3000:3000 lemon-simple-prod`

### Teste
- execute `docker-compose up --build test`
