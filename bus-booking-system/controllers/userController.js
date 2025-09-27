const connection = require('../utils/db-connection');
const db = require('../utils/db-connection');
const getAllUsers = (req,res) =>{
   const fetchQuery = `SELECT * from Users`;
   db.execute(fetchQuery,(err,data)=>{
    if(err){
        res.status(500).send(err.message);
        connection.end();
        return;
    }
    res.status(200).send(data)
   })
};

const addUser = (req,res) =>{
    const {id,name,email} = req.body;
    const insertionQuery = `INSERT INTO Users (userId,name,email) VALUES (?,?,?)`
    db.execute(insertionQuery,[parseInt(id),name,email],(err)=>{
        if(err){
            res.status(500).send(err.message);
            connection.end();
            return;
        }
        res.status(200).send("User is successfully added.")
    })
}

module.exports = {getAllUsers, addUser};