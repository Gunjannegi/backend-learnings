const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthplace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    career: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numberOfMatches: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    filters: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    average: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wickets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

});

module.exports = Player;