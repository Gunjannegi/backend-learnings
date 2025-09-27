const connection = require('../utils/db-connection');
const getBusWithAvailableSeats = (req,res)=>{
    const {seats} = req.params;
    const fetchQuery = `SELECT * from Buses WHERE availableSeats > ${seats}`
    connection.execute(fetchQuery,[seats],(err,data)=>{
        if(err){
            res.status(500).send(err.message);
            connection.end();
            return;
        }
        res.status(200).send(data);
    });
};
const addBus = (req,res) =>{
    const {busId, busNumber, totalSeats, availableSeats} = req.body;
    const insertionQuery = `INSERT INTO Buses (busId,busNumber,totalSeats,availableSeats) VALUES (?,?,?,?)`;
    connection.execute(insertionQuery,[busId,busNumber,totalSeats,availableSeats],(err)=>{
        if(err){
            res.status(500).send(err.message);
            connection.end();
            return;
        }
        res.status(201).send("Bus is successfully added")
    })
};

module.exports = {getBusWithAvailableSeats,addBus}