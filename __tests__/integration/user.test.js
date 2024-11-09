// __tests__/integration/user.test.js
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const api = axios.create({
    baseURL: 'http://localhost:3500/api',
    validateStatus: false
});

describe('Suite de Testes de Integração - Usuários', () => {
    let authToken;
    let testUser;

    beforeAll(async () => {
        testUser = {
            name: `Test User ${uuidv4().slice(0, 8)}`,
            email: `test.${uuidv4().slice(0, 8)}@example.com`,
            password: 'Test@123'
        };
    });

    describe('1. Testes de Registro e Autenticação', () => {
        test('Deve criar um novo usuário com sucesso', async () => {
            const response = await api.post('/users', testUser);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('id');
            expect(response.data.name).toBe(testUser.name);
            expect(response.data.email).toBe(testUser.email);
            expect(response.data).not.toHaveProperty('password');
            testUser.id = response.data.id;
        });

        test('Não deve criar usuário com email duplicado', async () => {
            const response = await api.post('/users', testUser);
            expect(response.status).toBe(400);
            expect(response.data.message).toBe('Email já cadastrado');
        });

        test('Não deve criar usuário com dados inválidos', async () => {
            const invalidUsers = [
                { 
                    ...testUser, 
                    email: 'invalid-email',
                    password: '123' // senha muito curta
                },
                { 
                    ...testUser,
                    name: '', // nome vazio
                    email: 'another@email.com'
                },
                {} // objeto vazio
            ];

            for (const invalidUser of invalidUsers) {
                const response = await api.post('/users', invalidUser);
                expect(response.status).toBe(400);
                expect(response.data).toHaveProperty('errors');
            }
        });

        test('Deve fazer login com sucesso', async () => {
            const response = await api.post('/auth/login', {
                email: testUser.email,
                password: testUser.password
            });

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('token');
            authToken = response.data.token;
        });

        test('Não deve fazer login com credenciais inválidas', async () => {
            const invalidLogins = [
                { email: testUser.email, password: 'wrong-password' },
                { email: 'nonexistent@email.com', password: testUser.password },
                { email: 'invalid-email', password: testUser.password },
                {}
            ];

            for (const invalidLogin of invalidLogins) {
                const response = await api.post('/auth/login', invalidLogin);
                expect([400, 401]).toContain(response.status);

                expect(
                    response.data.hasOwnProperty('message') || 
                    response.data.hasOwnProperty('errors')
                ).toBeTruthy();
            }
        });
    });

    describe('2. Testes de Busca e Listagem', () => {
        test('Deve buscar usuário por ID', async () => {
            const response = await api.get(`/users/${testUser.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            expect(response.status).toBe(200);
            expect(response.data.id).toBe(testUser.id);
            expect(response.data.name).toBe(testUser.name);
            expect(response.data).not.toHaveProperty('password');
        });

        test('Não deve buscar usuário com ID inválido', async () => {
            const response = await api.get(`/users/invalid-id`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            expect(response.status).toBe(404);
        });

        test('Deve listar todos os usuários', async () => {
            const response = await api.get('/users', {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeGreaterThan(0);
            
            const foundUser = response.data.find(u => u.id === testUser.id);
            expect(foundUser).toBeTruthy();
            expect(foundUser.name).toBe(testUser.name);
        });
    });

    describe('3. Testes de Atualização', () => {
        test('Deve atualizar usuário com sucesso', async () => {
            const updateData = {
                name: `Updated User ${uuidv4().slice(0, 8)}`,
            };

            const response = await api.put(`/users/${testUser.id}`, updateData, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            expect(response.status).toBe(200);
            expect(response.data.name).toBe(updateData.name);
            expect(response.data.email).toBe(testUser.email);
            
            // Verificar se a atualização persistiu
            const checkResponse = await api.get(`/users/${testUser.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            expect(checkResponse.data.name).toBe(updateData.name);
        });

        test('Não deve atualizar usuário com dados inválidos', async () => {
            // Primeiro, vamos pegar os dados atuais do usuário
            const originalUser = (await api.get(`/users/${testUser.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })).data;

            const invalidUpdates = [
                { email: 'invalid-email' },
                { name: '' },
                { password: '123' }
            ];

            for (const invalidUpdate of invalidUpdates) {
                const updateResponse = await api.put(
                    `/users/${testUser.id}`, 
                    invalidUpdate,
                    { headers: { Authorization: `Bearer ${authToken}` }}
                );

                // Verifica o estado atual do usuário após a tentativa de atualização
                const currentUser = (await api.get(`/users/${testUser.id}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                })).data;

                // Se a API retornou sucesso (200), os dados inválidos não devem ter sido aplicados
                if (updateResponse.status === 200) {
                    console.log('Update response:', updateResponse.data);
                    console.log('Current user state:', currentUser);
                    
                    if (invalidUpdate.email) {
                        // O email deve permanecer o mesmo do original
                        expect(currentUser.email).toBe(originalUser.email);
                    }
                    if (invalidUpdate.name === '') {
                        // O nome deve permanecer o mesmo do original
                        expect(currentUser.name).toBe(originalUser.name);
                    }
                } else {
                    // Se a API rejeitou a atualização, deve ser com status 400
                    expect(updateResponse.status).toBe(400);
                    expect(
                        updateResponse.data.hasOwnProperty('message') || 
                        updateResponse.data.hasOwnProperty('errors')
                    ).toBeTruthy();

                    // Verifica se os dados permaneceram inalterados
                    expect(currentUser).toEqual(originalUser);
                }
            }
        });

        test('Não deve atualizar usuário inexistente', async () => {
            const response = await api.put(`/users/invalid-id`, { name: 'New Name' }, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            expect(response.status).toBe(404);
        });
    });

    describe('4. Testes de Deleção', () => {
        test('Não deve deletar usuário sem autenticação', async () => {
            const response = await api.delete(`/users/${testUser.id}`);
            expect(response.status).toBe(401);
        });

        test('Não deve deletar usuário inexistente', async () => {
            const invalidId = 'non-existent-id';
            const deleteResponse = await api.delete(`/users/${invalidId}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            if (deleteResponse.status === 204) {
                const checkResponse = await api.get(`/users/${invalidId}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                expect(checkResponse.status).toBe(404);
            } else {
                expect(deleteResponse.status).toBe(404);
            }
        });

        test('Deve deletar usuário com sucesso', async () => {
            const response = await api.delete(`/users/${testUser.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            expect(response.status).toBe(204);

            // Verificar se o usuário foi realmente deletado
            const checkResponse = await api.get(`/users/${testUser.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            expect(checkResponse.status).toBe(404);
        });
    });

    describe('5. Testes de Segurança', () => {
        test('Não deve acessar rotas protegidas sem token', async () => {
            const protectedRoutes = [
                { method: 'get', path: '/users' },
                { method: 'get', path: `/users/${testUser.id}` },
                { method: 'put', path: `/users/${testUser.id}` },
                { method: 'delete', path: `/users/${testUser.id}` }
            ];

            for (const route of protectedRoutes) {
                let response;
                if (route.method === 'get') {
                    response = await api.get(route.path);
                } else if (route.method === 'put') {
                    response = await api.put(route.path, { name: 'Test' });
                } else if (route.method === 'delete') {
                    response = await api.delete(route.path);
                }
                expect(response.status).toBe(401);
            }
        });

        test('Não deve acessar rotas protegidas com token inválido', async () => {
            const response = await api.get('/users', {
                headers: { Authorization: 'Bearer invalid-token' }
            });
            expect(response.status).toBe(401);
        });
    });

    describe('6. Testes de Performance', () => {
        test('Deve responder requisiçsõe em menos de 200ms', async () => {
            const startTime = Date.now();
            
            await api.get('/users', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            expect(responseTime).toBeLessThan(200);
        });
    });
});