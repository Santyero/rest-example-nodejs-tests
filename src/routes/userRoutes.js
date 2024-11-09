const express = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const userValidations = {
    name: body('name')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório'),
    email: body('email')
        .trim()
        .isEmail().withMessage('Email inválido'),
    password: body('password')
        .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres')
};

router.post('/', [
    userValidations.name,
    userValidations.email,
    userValidations.password
], validateRequest, UserController.create);

router.get('/', auth, UserController.list);
router.get('/:id', auth, UserController.getById);

router.put('/:id', auth, [
    body('name').if(body('name').exists()).trim().notEmpty()
        .withMessage('Nome não pode ser vazio'),
    body('email').if(body('email').exists()).trim().isEmail()
        .withMessage('Email inválido'),
    body('password').if(body('password').exists()).isLength({ min: 6 })
        .withMessage('Senha deve ter no mínimo 6 caracteres')
], validateRequest, UserController.update);

router.delete('/:id', auth, UserController.delete);

module.exports = router;