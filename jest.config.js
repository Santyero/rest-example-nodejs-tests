module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/__config__/testSetup.js'],
    globalSetup: '<rootDir>/__config__/globalSetup.js',
    globalTeardown: '<rootDir>/__config__/globalTeardown.js',
    testTimeout: 30000,
    verbose: true
};