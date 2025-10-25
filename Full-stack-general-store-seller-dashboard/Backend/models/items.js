const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Item = sequelize.define('Item',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    item:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false
    },
    quantity:{
        type:DataTypes.STRING,
        allowNull:false
    },

});

module.exports = Item;