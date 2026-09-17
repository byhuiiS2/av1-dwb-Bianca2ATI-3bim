# API Hello Kitty

API REST desenvolvida em Node.js com Express para gerenciamento de personagens do universo Hello Kitty.

O projeto possui operações de CRUD, cadastro e login de usuários, autenticação por token, criptografia de senhas, upload de imagens e documentação utilizando Swagger.

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- bcrypt
- Multer
- Swagger UI
- Insomnia
- GitHub

## Funcionalidades

### Personagens

A API permite:

- Listar todos os personagens
- Buscar um personagem pelo ID
- Cadastrar um novo personagem
- Atualizar um personagem
- Excluir um personagem

Os dados dos personagens são armazenados em memória.

### Usuários

A API permite:

- Cadastrar usuários
- Realizar login
- Criptografar as senhas utilizando bcrypt
- Gerar um token de autenticação

### Autenticação

As rotas de personagens são protegidas por autenticação.

É necessário enviar um token no cabeçalho da requisição:

```text
Authorization: Bearer TOKEN