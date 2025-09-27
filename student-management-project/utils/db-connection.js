const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gunjan@sql',
    database:'testDB'
});

connection.connect((err)=>{
     if(err){
        console.log(err);
        connection.end();
        return;
     }
    const creationQuery = `CREATE TABLE IF NOT EXISTS Students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30),
    age INT)`;

    connection.execute(creationQuery,(err)=>{
      if(err){
        console.log(err.message);
        return;
      }
      console.log("Table is Created");
    })

}
);

module.exports = connection;
