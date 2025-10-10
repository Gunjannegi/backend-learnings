const Booking = require('../models/bookings');
const Bus = require('../models/buses');
const { Op, where } = require('sequelize');
const User = require('../models/users');
const addBus = async (req, res) => {
    try {
        const { busNumber, totalSeats, availableSeats } = req.body;
        const bus = await Bus.create({
            busNumber: busNumber,
            totalSeats: totalSeats,
            availableSeats: availableSeats
        });
        res.status(201).send(`User with bus number: ${busNumber} is created.`)
    } catch (err) {
        res.status(500).send(err)
    }
}

const getAllBusesWithAvailableSeats = async (req, res) => {
    const { seats } = req.params;
    try {
        const bus = await Bus.findAll({
            where: {
                availableSeats: {
                    [Op.gt]: parseInt(seats) // Sequelize "greater than" operator
                }
            }
        })
        res.status(200).send(bus);
    } catch (err) {
        res.status(500).send(err)
    }
}

const getAllBookingsForSpecificBus = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Booking.findAll({
            where: { BusId: id },
            include: {
                model: User,
                attribute: ['name', 'email']
            },
            attribute: ["id", "seatNumber"]

        });
        const result = bookings.map(booking=>{
            return{
                id:booking.id,
                seatNumber:booking.seatNumber,
                user:{
                    name:booking.User.name,
                    email:booking.User.email
                }
            }
        });
        if(result.length===0){
            res.status(404).send("No bookings found.");
            return;
        }
        res.status(200).send(result)
    } catch (err) {
        res.send(500).status(err);
    }
}

module.exports = { addBus, getAllBusesWithAvailableSeats, getAllBookingsForSpecificBus }