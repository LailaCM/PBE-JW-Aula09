# Autenticação JWT - Exemplo Senai

Projeto Fullstack com Node.js, Express e autenticação JWT para controle de login e visualização de posts.

## Contextualização

Este projeto simula um sistema de autenticação simples, onde o usuário faz login e, ao ser autenticado, pode visualizar uma lista de posts. O backend utiliza Node.js e Express, com autenticação via JWT. O frontend é uma página HTML/CSS/JS que consome a API.

## Tecnologias

- Node.js
- Express
- JWT (jsonwebtoken)
- VsCode
- Insomnia ou Thunder Client (para testar rotas)
- HTML, CSS, JavaScript

## Como testar

1. **Clone este repositório**
2. Abra o repositório com o **VsCode**
3. Crie o arquivo `.env` na pasta `api` e adicione a seguinte variável:
   ```
   SECRET_JWT=sua_chave_secreta_aqui
   ```
   (Você pode usar a chave já presente no exemplo)
4. Abra o terminal (**CTRL + '**) e navegue até a pasta `api`:
   ```
   cd api
   ```
5. Instale as dependências:
   ```
   npm install
   ```
6. Inicie o servidor backend:
   ```
   node server.js
   ```
   ou
   ```
   npm start
   ```
7. Abra o arquivo `front/pages/index.html` no navegador para acessar o frontend.
8. Faça login usando:
   - **E-mail:** eu@gmail.com
   - **Senha:** Senha
9. Após o login, você será redirecionado para a página de posts.
10. Para testar as rotas manualmente, utilize o **Insomnia** ou **Thunder Client** e importe as rotas:
    - `POST http://localhost:3000/login`  
      Body:  
      ```json
      {
        "user": "eu@gmail.com",
        "psw": "Senha"
      }
      ```
    - `GET http://localhost:3000/posts`  
      Header:  
      ```
      Authorization: Bearer <token>
      ```

## Observações

- O backend utiliza autenticação JWT para proteger a rota de posts.
- O frontend armazena o token no localStorage e utiliza para acessar os posts.
- Os dados dos posts estão em `api/src/data/posts.js`.

---

*Feito por **Laila Casadei Macêdo***