const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log("Connection has been established.")
}).catch(err=>{console.log(err)});

module.exports = sequelize;
