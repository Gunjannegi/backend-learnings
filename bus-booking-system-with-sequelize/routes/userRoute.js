const express = require('express');
const router = express.Router();
const {addUser,getAllUsers, getAllBookings} = require('../controller/userController');

router.post('/',addUser);
router.get('/',getAllUsers);
router.get('/:id/bookings',getAllBookings);

module.exports = router;