const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

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

global.api = api;
global.uuidv4 = uuidv4;