# API REST com Testes Automatizados

## Descrição
API REST desenvolvida em Node.js com Express, focada em boas práticas e cobertura completa de testes automatizados. O projeto implementa um CRUD básico de usuários e produtos com autenticação JWT.

## Estrutura do Projeto
```
project/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── index.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── productService.js
│   │   └── userService.js
│   └── server.js
├── __tests__/
│   ├── integration/
│   │   ├── user.test.js
│   │   └── product.test.js
│   ├── health/
│   │   └── api.test.js
│   └── setup/
│       └── testSetup.js
├── .env
├── .gitignore
├── jest.config.js
├── jest.setup.js
└── package.json
```

## Pré-requisitos
- Node.js (v14+)
- npm ou yarn

## Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd [nome-do-projeto]
```

2. Instale as dependências
```bash
npm install
```

3. Configure o ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

## Configuração

### Variáveis de Ambiente (.env)
```env
PORT=3500
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=1h
```

### Dependências Principais
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.1",
    "axios": "^1.6.2"
  }
}
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Testes
```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em watch mode
npm run test:watch
```

## API Endpoints

### Autenticação
- `POST /auth/login` - Login de usuário

### Usuários
- `POST /users` - Criar novo usuário
- `GET /users` - Listar usuários (requer autenticação)
- `GET /users/:id` - Buscar usuário por ID (requer autenticação)
- `PUT /users/:id` - Atualizar usuário (requer autenticação)
- `DELETE /users/:id` - Deletar usuário (requer autenticação)

### Produtos
- `POST /products` - Criar produto (requer autenticação)
- `GET /products` - Listar produtos
- `GET /products/:id` - Buscar produto por ID
- `PUT /products/:id` - Atualizar produto (requer autenticação)
- `DELETE /products/:id` - Deletar produto (requer autenticação)

### Status
- `GET /health` - Verificar status da API

## Exemplos de Requisições

### Login
```javascript
POST /auth/login
{
  "email": "user@example.com",
  "password": "123456"
}
```

### Criar Usuário
```javascript
POST /users
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Criar Produto
```javascript
POST /products
headers: {
  "Authorization": "Bearer {token}"
}
{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description"
}
```

## Testes

### Estrutura de Testes
- Testes de Integração
- Testes de Unidade
- Testes de Health Check
- Testes de Segurança

### Executando Testes Específicos
```bash
# Testes de integração
npm run test:integration

# Testes unitários
npm run test:unit

# Testes de saúde
npm run test:health
```

## Validações

### Usuários
- Email único e válido
- Senha com mínimo de 6 caracteres
- Nome obrigatório

### Produtos
- Nome obrigatório
- Preço maior que zero
- Descrição obrigatória

## Segurança
- Autenticação JWT
- Senhas criptografadas com bcrypt
- Validação de dados com express-validator
- Headers CORS configurados

## Scripts Disponíveis
```bash
npm start         # Inicia o servidor
npm run dev      # Inicia o servidor com nodemon
npm test         # Executa os testes
npm run coverage # Gera relatório de cobertura de testes
```

## Contribuição
1. Faça o fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença
MIT
