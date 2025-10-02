const Sequelize = require('sequelize');


const sequelize = new Sequelize('testdb','root','Gunjan@sql',{
    host:'localhost',
    dialect:'mysql'
});

(async()=>{
    try{
       await sequelize.authenticate();
       console.log("Connection to the database has been established");
    }catch(err){
       console.log(err)
    }
})();

module.exports = sequelize;