const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("testdb", "root", "Gunjan@sql", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established.")
}).catch(error => {
    console.log(error);
});

module.exports = sequelize;