const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gunjan@sql',
    database:'testDB'
});

connection.connect(err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('Connection has been created.')
    const creationQuery = `create table IF NOT EXISTS Students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(28),
    email VARCHAR(28))`

    connection.execute(creationQuery,err=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log(`Table is created`)
    })
})
module.exports = connection;