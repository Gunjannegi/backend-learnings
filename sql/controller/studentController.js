const db = require('../utils/db-connection');
const addEntries = (req,res)=>{
    console.log(req.body)
    const {email,name} = req.body;
    const inserQuery = `INSERT INTO Students (email,name) VALUES (?,?)`;

    db.execute(inserQuery,[email,name],(err)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            connection.end();
            return;
        }
        console.log("Value has been inserted");
        res.status(200).send(`Student with name ${name} successfully added`)
    })
};

const updateEntries = (req,res)=>{
    const {id} = req.params;
    const {name} = req.body;

    const updateQuery = "UPDATE Students set name=? WHERE id=?"
    db.query(updateQuery,[name,id],(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        if(result.affectedRows===0){
            res.status(404).send("Student not found");
            return;
        }
        res.status(200).send(`User ${name} has been updated.`)
    })
}

    const deleteEntries = (req,res) =>{
        const {id} = req.params;

        const deleteQuery = `DELETE FROM Students WHERE id = ?`
        db.query(deleteQuery,[id],(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        if(result.affectedRows===0){
            res.status(404).send("Student not found");
            return;
        }
        res.status(200).send(`User with id ${id} is deleted.`)
    })

    }

module.exports = {addEntries, updateEntries, deleteEntries};
