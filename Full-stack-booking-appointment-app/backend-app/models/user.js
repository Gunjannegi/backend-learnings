const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Users',
});

module.exports = User;