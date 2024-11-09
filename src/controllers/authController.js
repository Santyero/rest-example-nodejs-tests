const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.authenticate(email, password);
            
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1h' }
            );

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();