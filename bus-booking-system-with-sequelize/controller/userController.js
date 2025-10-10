const Booking = require('../models/bookings');
const Bus = require('../models/buses');
const User = require('../models/users');

const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({
            name: name,
            email: email
        });
        res.status(201).send(`User with name: ${name} is created.`)
    } catch (err) {
        res.status(500).send(err)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

const getAllBookings = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Booking.findAll({
            where: { UserId: id },
            include: {
                model: Bus,
                attribute: ['busNumber']
            },
            attribute: ["id", "seatNumber"]
        });
        const result = bookings.map(booking=>{
            return{
                id:booking.id,
                seatNumber:booking.seatNumber,
                bus:{
                    busNumber:booking.Bus.busNumber
                }
            }
        });
        if(result.length===0){
            res.status(404).send("No bookings found.");
            return;
        }
        res.status(200).send(result);

    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { addUser, getAllUsers, getAllBookings }