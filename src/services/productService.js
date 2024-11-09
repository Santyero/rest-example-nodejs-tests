const { v4: uuidv4 } = require('uuid');

class ProductService {
    constructor() {
        this.products = [];
    }

    async create(productData) {
        const product = {
            id: uuidv4(),
            name: productData.name,
            price: productData.price,
            description: productData.description,
            createdAt: new Date()
        };

        this.products.push(product);
        return product;
    }

    async list() {
        return this.products;
    }

    async getById(id) {
        return this.products.find(p => p.id === id);
    }

    async update(id, productData) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        this.products[index] = { ...this.products[index], ...productData };
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
}

module.exports = new ProductService();