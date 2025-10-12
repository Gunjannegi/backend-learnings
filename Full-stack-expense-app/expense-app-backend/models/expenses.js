const {DataTypes} = require('sequelize')
const sequelize = require('../utils/db-connection');

const Expense = sequelize.define('Expense',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
     description:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Expense;