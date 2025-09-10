const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, addUser} = require('../controllers/userController');

router.get('/', getAllUsers);

router.post('/', getUserById);

router.get('/:id', addUser);

module.exports = router;