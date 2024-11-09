const express = require('express');
const { body } = require('express-validator');
const ProductController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/', auth, [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('price').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
    body('description').notEmpty().withMessage('Descrição é obrigatória')
], validateRequest, ProductController.create);

router.get('/', ProductController.list);
router.get('/:id', ProductController.getById);
router.put('/:id', auth, ProductController.update);
router.delete('/:id', auth, ProductController.delete);

module.exports = router;