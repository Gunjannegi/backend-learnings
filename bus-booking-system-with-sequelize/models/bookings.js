const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Booking = sequelize.define('Booking',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    seatNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }

});

module.exports = Booking;