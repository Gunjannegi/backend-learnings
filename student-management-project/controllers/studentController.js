const connection = require('../utils/db-connection');
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

const addStudent = (req, res) => {
    const { name, email, age } = req.body;
    const insertionQuery = `INSERT INTO Students(name,email,age) VALUES (?,?,?)`;
    connection.execute(insertionQuery, [name, email, age], (err) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.status(201).send(`Student with name ${name} is successfully added.`)
    })
};

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

const updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updationQuery = `UPDATE Students SET name=?, email=?, age=? WHERE id=? `;
    connection.execute(updationQuery, [name, email, age, id], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("No Student found.");
            return;
        }
        res.status(200).send("Student is successfully updated");
    })

};

const deleteStudent = (req, res) => {
    const { id } = req.params;
    const deletionQuery = `DELETE FROM Students WHERE id = ?`;
    connection.execute(deletionQuery, [id], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("No Student found.");
            return;
        }
        res.status(200).send("Student is successfully deleted");
    })
};

module.exports = { getAllStudents, addStudent, getStudentById, updateStudent, deleteStudent }