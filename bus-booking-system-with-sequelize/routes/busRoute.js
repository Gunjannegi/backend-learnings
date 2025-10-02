const express = require('express');
const router = express.Router();
const {addBus, getAllBusesWithAvailableSeats} = require('../controller/busController');

router.post('/',addBus);
router.get('/available/:seats',getAllBusesWithAvailableSeats);

module.exports = router;