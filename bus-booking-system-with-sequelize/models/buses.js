const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Bus = sequelize.define('Buses', {
    busId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    busNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Bus;