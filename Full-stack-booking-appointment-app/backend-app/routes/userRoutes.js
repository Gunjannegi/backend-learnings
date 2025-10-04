const express = require('express');
const router = express.Router();
const {getAllUsers,addUser,deleteUser, editUser} = require('../controller/userController')

router.get('/getAllUsers',getAllUsers);
router.post('/addUser', addUser);
router.delete('/:id', deleteUser);
router.put('/:id',editUser);

module.exports = router;