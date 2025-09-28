// const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'root', 'Gunjan@sql', {
  host: 'localhost',
  dialect: 'mysql'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to tha Database has been created");
  } catch (error) {
    console.log(error);
  }
}
)();

module.exports = sequelize;

// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Gunjan@sql',
//     database:'testDB'
// });

// connection.connect((err)=>{
//      if(err){
//         console.log(err);
//         connection.end();
//         return;
//      }
//     const creationQuery = `CREATE TABLE IF NOT EXISTS Students(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(30),
//     email VARCHAR(30),
//     age INT)`;

//     connection.execute(creationQuery,(err)=>{
//       if(err){
//         console.log(err.message);
//         return;
//       }
//       console.log("Table is Created");
//     })

// }
// );

// module.exports = connection;
