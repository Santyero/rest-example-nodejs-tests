const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');

router.get('/health', (req, res) => {
    console.log('Health check route hit');
    res.json({
        status: 'API is running',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

console.log('Mounting routes:');
console.log('- /auth');
router.use('/auth', authRoutes);
console.log('- /users');
router.use('/users', userRoutes);
console.log('- /products');
router.use('/products', productRoutes);

module.exports = router;