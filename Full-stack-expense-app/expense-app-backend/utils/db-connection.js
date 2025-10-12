const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("testdb", "root", "Gunjan@sql",{
    host: "localhost",
    dialect: 'mysql'
})
sequelize.authenticate().then(()=>{
    console.log("Connection has been established.")
}).catch((err)=>{
    console.log("Unable to connect to the database", err)
});


module.exports = sequelize;