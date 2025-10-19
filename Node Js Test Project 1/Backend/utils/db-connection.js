const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('testdb','root','Gunjan@sql',{
    'host':'localhost',
    'dialect' : 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log("Connection is created");
}).catch((err)=>{console.log("Connection Failed", err)});

module.exports = sequelize;