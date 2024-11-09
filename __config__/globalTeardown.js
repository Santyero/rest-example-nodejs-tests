module.exports = async () => {
    await global.__SERVER__.close();
    console.log('Test server stopped');
};
