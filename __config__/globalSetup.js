const app = require('../src/server');

let server;

module.exports = async () => {
    server = app.listen(3500, () => {
        console.log('Test server started on port 3500');
    });
    // Expor o servidor globalmente
    global.__SERVER__ = server;
};