const Bus = require('../models/buses');
const { Op } = require('sequelize');
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

const getAllBusesWithAvailableSeats = async(req, res) => {
    const {seats} = req.params;
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

module.exports = { addBus , getAllBusesWithAvailableSeats}