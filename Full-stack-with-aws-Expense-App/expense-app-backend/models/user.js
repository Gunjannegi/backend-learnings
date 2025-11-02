const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const User = sequelize.define('User',{
   id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
   },
   username:{
    type: DataTypes.STRING,
    allowNull:false
   },
   useremail:{
    type: DataTypes.STRING,
    allowNull:false
   },
    userpassword:{
    type: DataTypes.STRING,
    allowNull:false
   }

});

module.exports = User;