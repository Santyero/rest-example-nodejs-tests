const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3500/api',
    validateStatus: false
});

describe('Suite de Testes de Saúde da API', () => {
    test('API deve estar online', async () => {
        const response = await api.get('/health');
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('API is running');
    });

    test('Deve ter todos endpoints necessários disponíveis', async () => {
        const endpoints = [
            { method: 'get', path: '/health' },
            { method: 'post', path: '/auth/login' },
            { method: 'get', path: '/users' },
            { method: 'get', path: '/products' }
        ];

        for (const endpoint of endpoints) {
            const response = await (endpoint.method === 'get'
                ? api.get(endpoint.path)
                : api.post(endpoint.path, {}));

            expect([200, 401, 400]).toContain(response.status); // Aceita 200, 401 (não autorizado) ou 400 (bad request)
        }
    });
});