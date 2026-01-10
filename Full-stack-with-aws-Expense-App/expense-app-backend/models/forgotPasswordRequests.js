const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../utils/db-connection");

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests', {
    id: {
        type: DataTypes.STRING,
        primaryKey:true
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }

});

module.exports =  ForgotPasswordRequests;