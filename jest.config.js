module.exports = {
    // Define que os testes serão executados em ambiente Node.js
    // ao invés de um ambiente de navegador (jsdom)
    testEnvironment: 'node',

    // Especifica arquivo(s) que serão executados após o Jest ser carregado
    // mas antes dos testes começarem. Útil para configurações globais de testes
    setupFilesAfterEnv: ['<rootDir>/__config__/testSetup.js'],

    // Define um arquivo que será executado uma vez antes de todos os testes
    // Geralmente usado para setup global como conexão com banco de dados
    globalSetup: '<rootDir>/__config__/globalSetup.js',

    // Define um arquivo que será executado uma vez depois que todos os testes terminarem
    // Útil para limpeza global como fechar conexões com banco de dados
    globalTeardown: '<rootDir>/__config__/globalTeardown.js',

    // Define o tempo máximo (em millisegundos) que um teste pode levar
    // Neste caso, 30 segundos. Se ultrapassar, o teste falha
    testTimeout: 30000,

    // Ativa o modo verbose, que mostra informações detalhadas 
    // durante a execução dos testes
    verbose: true
};