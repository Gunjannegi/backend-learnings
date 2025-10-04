const {DataTypes} = require('sequelize');
const sequelize = require('../utils/db-connection');

const IdentityCard = sequelize.define('identitycard',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    cardNo:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
});
module.exports = IdentityCard;