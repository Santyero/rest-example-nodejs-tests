const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Senha é obrigatória')
], validateRequest, AuthController.login);

module.exports = router;