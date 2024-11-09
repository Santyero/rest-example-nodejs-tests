const ProductService = require('../services/productService');

class ProductController {
    async create(req, res) {
        try {
            const product = await ProductService.create(req.body);
            return res.status(201).json(product);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async list(req, res) {
        try {
            const products = await ProductService.list();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const product = await ProductService.getById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const product = await ProductService.update(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await ProductService.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductController();