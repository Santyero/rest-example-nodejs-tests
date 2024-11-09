module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.test.js'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
        '<rootDir>/__tests__/setup/testSetup.js'
    ],
    testTimeout: 30000,
    verbose: true
};