const request = require('supertest');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const app = require('../src/server');

const api = axios.create({
    baseURL: 'http://localhost:3500/api',
    validateStatus: false
});

api.interceptors.request.use(request => {
    console.log('Starting Request:', {
        method: request.method.toUpperCase(),
        url: request.url,
        data: request.data,
        headers: request.headers
    });
    return request;
});

api.interceptors.response.use(response => {
    console.log('Response:', {
        status: response.status,
        data: response.data
    });
    return response;
});

const testHelpers = {
    generateRandomUser: () => ({
        name: `Test User ${uuidv4().slice(0, 8)}`,
        email: `test.${uuidv4().slice(0, 8)}@example.com`,
        password: 'Test@123'
    }),

    generateRandomProduct: () => ({
        name: `Test Product ${uuidv4().slice(0, 8)}`,
        price: parseFloat((Math.random() * 1000).toFixed(2)),
        description: `Test description for product ${uuidv4().slice(0, 8)}`
    })
};

global.api = api;
global.testHelpers = testHelpers;
global.uuidv4 = uuidv4;