const express = require('express');
const router = express.Router();
const {addBus, getAllBusesWithAvailableSeats, getAllBookingsForSpecificBus} = require('../controller/busController');

router.post('/',addBus);
router.get('/available/:seats',getAllBusesWithAvailableSeats);
router.get('/:id/bookings', getAllBookingsForSpecificBus)

module.exports = router;