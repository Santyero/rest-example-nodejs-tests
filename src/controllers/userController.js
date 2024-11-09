const UserService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
    async create(req, res) {
        try {
            const user = await UserService.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async list(req, res) {
        try {
            const users = await UserService.list();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            if (req.body.email && !this.isValidEmail(req.body.email)) {
                return res.status(400).json({
                    errors: [{ 
                        msg: 'Email inválido',
                        param: 'email',
                        value: req.body.email
                    }]
                });
            }

            if (req.body.name === '') {
                return res.status(400).json({
                    errors: [{ 
                        msg: 'Nome não pode ser vazio',
                        param: 'name',
                        value: req.body.name
                    }]
                });
            }

            if (req.body.password && req.body.password.length < 6) {
                return res.status(400).json({
                    errors: [{ 
                        msg: 'Senha deve ter no mínimo 6 caracteres',
                        param: 'password'
                    }]
                });
            }

            const user = await UserService.update(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await UserService.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = new UserController();