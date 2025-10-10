const express = require('express');
const { addBooking } = require('../controller/bookingController');
const router = express.Router();

router.post('/',addBooking);

module.exports = router;