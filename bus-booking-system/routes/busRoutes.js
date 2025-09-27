const express = require('express');
const router = express.Router();
const {getBusWithAvailableSeats, addBus} = require('../controllers/busController');

router.get('/available/:seats',getBusWithAvailableSeats);
router.post('/', addBus);

module.exports = router;