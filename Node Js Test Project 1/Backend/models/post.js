const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Post;