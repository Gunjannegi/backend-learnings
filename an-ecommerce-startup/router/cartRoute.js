const express = require('express');
const router = express.Router();
const {getProductByUserId, addProductInCart} = require('../controllers/cartController');

router.get('/:userId', getProductByUserId)

router.post('/:userId',addProductInCart)

module.exports = router;