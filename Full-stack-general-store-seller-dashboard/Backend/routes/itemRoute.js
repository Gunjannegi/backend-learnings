const express = require('express');
const { getAllItems, addItem, updateItem } = require('../controllers/itemController');
const route = express.Router();

route.get('/',getAllItems);
route.post('/add',addItem);
route.put('/update/:id/:soldQuantity',updateItem);

module.exports = route;