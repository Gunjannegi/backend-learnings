const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'root', 'Gunjan@sql', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established");
}).catch(err => console.log(err));

module.exports  = sequelize;