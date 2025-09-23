const express = require('express');
const mysql = require('mysql2');
const app = express();
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gunjan@sql',
    database:'testDB'
})
app.get('/',(req,res)=>{
    res.send('Hello World');
});

connection.connect(err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('Connection has been created.')
    const creationQuery = `create table Students(
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


app.listen(3000,()=>{console.log('Server is running...')})