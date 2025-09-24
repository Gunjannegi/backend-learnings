const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gunjan@sql',
    database:'testDB',
    multipleStatements: true
});

connection.connect((err)=>{
    if(err){
        console.log(err);
        connection.end();
        return;
    }

    const creationQuery = `create table Users(
    userId int AUTO_INCREMENT PRIMARY KEY,
    name varchar(30),
    email varchar(30));
    create table Buses(
    busId int AUTO_INCREMENT PRIMARY KEY,
    busNumber int,
    totalSeats int,
    availableSeats int);
    create table Bookings(
    bookingId int AUTO_INCREMENT PRIMARY KEY,
    seatNumber int);
    create table Payments(
    paymentId int AUTO_INCREMENT PRIMARY KEY,
    amountPaid int,
    paymentStatus varchar(10));
    `;

    connection.query(creationQuery,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("Tables are created.")
    })
})


app.listen(3000,()=>{console.log('Server is listening...')})