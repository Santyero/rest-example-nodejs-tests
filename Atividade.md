# Atividade: Desenvolvimento de Testes REST para Módulo de Produtos

## Objetivo
Desenvolver uma suite completa de testes automatizados para a API REST de produtos, aplicando os conceitos de testes de integração, validação e segurança.

## Estrutura Base do Teste

```javascript
// __tests__/integration/product.test.js
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const api = axios.create({
    baseURL: 'http://localhost:3500/api',
    validateStatus: false
});

describe('Suite de Testes de Integração - Produtos', () => {
    let authToken;
    let testUser;
    let testProduct;

    beforeAll(async () => {
        // TODO: Implementar setup inicial
        // 1. Criar usuário de teste
        // 2. Fazer login para obter token
        // 3. Definir produto de teste
    });

    describe('1. Testes de Criação de Produto', () => {
        // TODO: Implementar testes de criação
    });

    describe('2. Testes de Busca e Listagem', () => {
        // TODO: Implementar testes de busca e listagem
    });

    describe('3. Testes de Atualização', () => {
        // TODO: Implementar testes de atualização
    });

    describe('4. Testes de Deleção', () => {
        // TODO: Implementar testes de deleção
    });

    describe('5. Testes de Validação e Regras de Negócio', () => {
        // TODO: Implementar testes de validação
    });

    describe('6. Testes de Segurança', () => {
        // TODO: Implementar testes de segurança
    });
});
```

## Tarefas

### 1. Setup Inicial
- Implementar `beforeAll` com:
  - Criação de usuário de teste
  - Login para obter token
  - Definição do objeto de produto para testes

### 2. Testes de Criação
Implementar testes para:
- [x] Criação com sucesso de produto
- [x] Validação de campos obrigatórios
- [x] Validação de tipos de dados
- [x] Validação de valores negativos no preço
- [x] Tentativa de criação sem autenticação

### 3. Testes de Busca e Listagem
Implementar testes para:
- [x] Listagem de todos os produtos
- [x] Busca por ID
- [x] Busca por ID inexistente
- [x] Validação dos dados retornados

### 4. Testes de Atualização
Implementar testes para:
- [x] Atualização com sucesso
- [x] Validação de dados na atualização
- [x] Atualização parcial
- [x] Atualização de produto inexistente
- [x] Tentativa de atualização sem autenticação

### 5. Testes de Deleção
Implementar testes para:
- [x] Deleção com sucesso
- [x] Tentativa de deleção sem autenticação
- [x] Deleção de produto inexistente
- [x] Verificação pós-deleção

### 6. Testes de Validação e Regras de Negócio
Implementar testes para:
- [x] Validação de formato de preço
- [x] Validação de descrição mínima
- [x] Validação de nome único
- [x] Regras específicas de negócio:
  - Preço não pode ser negativo
  - Nome não pode ser vazio
  - Descrição com mínimo de caracteres

### 7. Testes de Segurança
Implementar testes para:
- [x] Proteção das rotas
- [x] Validação de token
- [x] Tentativas de acesso não autorizado
- [x] Validação de dados maliciosos

## Exemplos de Implementação

### Exemplo de Criação de Produto
```javascript
test('Deve criar um produto com sucesso', async () => {
    const response = await api.post('/products', testProduct, {
        headers: { Authorization: `Bearer ${authToken}` }
    });
    
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(testProduct.name);
});
```

### Exemplo de Setup
```javascript
beforeAll(async () => {
    // Criar usuário
    testUser = {
        name: `Test User ${uuidv4().slice(0, 8)}`,
        email: `test.${uuidv4().slice(0, 8)}@example.com`,
        password: 'Test@123'
    };
    
    // Criar produto base
    testProduct = {
        name: `Test Product ${uuidv4().slice(0, 8)}`,
        price: 99.99,
        description: 'Test product description'
    };
});
```

### Exemplo de Validações
```javascript
test('Não deve criar produto com dados inválidos', async () => {
    const invalidProducts = [
        { ...testProduct, price: -10 },
        { ...testProduct, name: '' },
        { ...testProduct, description: 'abc' }
    ];

    for (const invalidProduct of invalidProducts) {
        const response = await api.post('/products', invalidProduct, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('errors');
    }
});
```

### Exemplo de Teste de Segurança
```javascript
test('Não deve acessar rotas protegidas sem token', async () => {
    const protectedRoutes = [
        { method: 'post', path: '/products' },
        { method: 'put', path: '/products/1' },
        { method: 'delete', path: '/products/1' }
    ];

    for (const route of protectedRoutes) {
        const response = await api[route.method](route.path);
        expect(response.status).toBe(401);
    }
});
```

## Requisitos Técnicos

1. **Organização do Código**
- Usar estrutura describe/test
- Seguir padrão AAA (Arrange, Act, Assert)
- Manter testes independentes

2. **Padrões de Teste**
- Nomenclatura clara e descritiva
- Setup e Teardown adequados
- Documentação dos testes

3. **Validações Obrigatórias**
- Status HTTP corretos
- Estrutura dos dados
- Mensagens de erro
- Estados antes e depois das operações

## Entrega

1. Criar arquivo `product.test.js` na pasta `__tests__/integration`
2. Implementar todos os grupos de testes solicitados
3. Documentar decisões e abordagens no código
4. Garantir que todos os testes estão passando

## Suporte
- Documentação da API disponível
- Exemplos de testes de usuários como referência
- Mentoria para dúvidas técnicas