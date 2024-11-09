const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class UserService {
    constructor() {
        this.users = [];
    }

    async create(userData) {
        const existingUser = this.users.find(u => u.email === userData.email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const user = {
            id: uuidv4(),
            name: userData.name,
            email: userData.email,
            password: bcrypt.hashSync(userData.password, 10),
            createdAt: new Date()
        };

        this.users.push(user);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async authenticate(email, password) {
        const user = this.users.find(u => u.email === email);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    async list() {
        return this.users.map(({ password, ...user }) => user);
    }

    async getById(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async update(id, userData) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return null;

        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 10);
        }

        this.users[index] = { ...this.users[index], ...userData };
        const { password, ...userWithoutPassword } = this.users[index];
        return userWithoutPassword;
    }

    async delete(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}

module.exports = new UserService();