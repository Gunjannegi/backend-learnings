const express = require('express');
const router = express.Router();
const {getAllProducts, getProductById, addProduct} = require('../controllers/productController');

router.get('/', getAllProducts);

router.post('/', addProduct);

router.get('/:id', getProductById);

module.exports = router;