const { IdentityCard } = require('../models');
const Students = require('../models/student');
const getAllStudents = (req, res) => {
    const fetchQuery = `SELECT * FROM Students`;
    connection.execute(fetchQuery, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.status(200).send(data)
    });
};

const addStudent = async (req, res) => {

    try {
        const { name, email } = req.body;
        const student = await Students.create({
            email: email,
            name: name,
        });

        res.status(201).send(`User with name: ${name} is created!`)
    } catch (error) {
        res.status(500).send('Unable to make an entry.');
    }
};

const addingValuesToStudentAndIdentityTable = async(req,res)=>{
    try{
      const student = await Students.create(req.body.students);
      const idCard = await IdentityCard.create({...req.body.IdentityCard , StudentId:student.id});
      res.status(201).json({student,idCard})
    }catch(err){
      res.status(500).json({error:err.message});
    }
}

const getStudentById = (req, res) => {
    const { id } = req.params;
    const fetchQuery = `SELECT * FROM Students WHERE id = ?`;
    connection.execute(fetchQuery, [id], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        if (result.length === 0) {
            res.status(404).send("No Student found.");
            return;
        }
        res.status(200).send(result);
    })
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;
        const student = await Students.findByPk(id);
        if (!student) {
            res.status(400).send("User not found");
        }
        student.name = name;
        await student.save();
        res.status(200).send("User has been updated!")
    } catch (error) {
        res.status(500).send("user cannot be updated")
    }
    //sql injection - any third party can interfere and insert values in our table
    // const updationQuery = `UPDATE Students SET name=?, email=?, age=? WHERE id=? `;
    // connection.execute(updationQuery, [name, email, age, id], (err, result) => {
    //     if (err) {
    //         res.status(500).send(err.message);
    //         return;
    //     }
    //     if (result.affectedRows === 0) {
    //         res.status(404).send("No Student found.");
    //         return;
    //     }
    //     res.status(200).send("Student is successfully updated");
    // })

};

const deleteStudent = async(req, res) => {
    try{
    const { id } = req.params;
     const student = await Students.destroy({
        where:{
            id:id
        }
       
     })
      if(!student){
          res.status(400).send("User is not found");  
        }
        res.status(200).send('User is deleted')
    }catch(error){
     res.status(500).send('Error encountered while deleting')
    }
    // const deletionQuery = `DELETE FROM Students WHERE id = ?`;
    // connection.execute(deletionQuery, [id], (err, result) => {
    //     if (err) {
    //         res.status(500).send(err.message);
    //         return;
    //     }
    //     if (result.affectedRows === 0) {
    //         res.status(404).send("No Student found.");
    //         return;
    //     }
    //     res.status(200).send("Student is successfully deleted");
    // })
};

module.exports = { getAllStudents, addStudent, getStudentById, updateStudent, deleteStudent, addingValuesToStudentAndIdentityTable }