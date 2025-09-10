const express = require("express");
const router = express.Router();
const { students } = require("../constants");

// Get all students
router.get("/", (req, res) => {
    let result = (students.map(student => student.name)).join(",");
    res.json(`Students:${result}`);
});

// Get a student by ID
router.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const student = students.find(student=>student.id===id);
    if(student){
        res.send(`Student:${student.name}`)
    }else{
        res.status(404).send("Student not found");
    }
});

module.exports = router;

