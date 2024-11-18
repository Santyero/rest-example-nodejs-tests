// Importações dos módulos necessários
const request = require('supertest');      // Para realizar requisições HTTP em testes
const axios = require('axios');            // Cliente HTTP para fazer requisições
const { v4: uuidv4 } = require('uuid');   // Gerador de IDs únicos
const app = require('../src/server');      // Aplicação Express/servidor

// Cria uma instância do axios configurada para a API
const api = axios.create({
    baseURL: 'http://localhost:3500/api',  // URL base para todas as requisições
    validateStatus: false                  // Não rejeita promessas para status de erro
});

// Interceptor para logging de requisições
api.interceptors.request.use(request => {
    // Loga detalhes da requisição antes de ser enviada
    console.log('Starting Request:', {
        method: request.method.toUpperCase(),
        url: request.url,
        data: request.data,
        headers: request.headers
    });
    return request;
});

// Interceptor para logging de respostas
api.interceptors.response.use(response => {
    // Loga detalhes da resposta recebida
    console.log('Response:', {
        status: response.status,
        data: response.data
    });
    return response;
});

// Objeto com funções auxiliares para testes
const testHelpers = {
    // Gera dados aleatórios para um usuário de teste
    generateRandomUser: () => ({
        name: `Test User ${uuidv4().slice(0, 8)}`,     // Nome aleatório
        email: `test.${uuidv4().slice(0, 8)}@example.com`, // Email aleatório
        password: 'Test@123'                            // Senha padrão para testes
    }),

    // Gera dados aleatórios para um produto de teste
    generateRandomProduct: () => ({
        name: `Test Product ${uuidv4().slice(0, 8)}`,  // Nome aleatório do produto
        price: parseFloat((Math.random() * 1000).toFixed(2)), // Preço aleatório
        description: `Test description for product ${uuidv4().slice(0, 8)}` // Descrição aleatória
    })
};

// Disponibiliza globalmente as ferramentas de teste
global.api = api;                // Cliente HTTP configurado
global.testHelpers = testHelpers;// Funções auxiliares
global.uuidv4 = uuidv4;         // Gerador de IDs