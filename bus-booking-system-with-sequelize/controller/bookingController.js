const Booking = require("../models/bookings");

const addBooking = async (req, res) => {
    try {
        const { UserId, BusId, seatNumber } = req.body;
        const booking = await Booking.create({
            UserId: UserId,
            BusId: BusId,
            seatNumber: seatNumber
        });
        res.status(201).send("Booking is successfully created.")
    } catch (err) {
        res.status(500).send(err);
    }

};

module.exports = { addBooking }