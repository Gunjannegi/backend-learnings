const express = require('express');
const router = express.Router();
const {getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent, addingValuesToStudentAndIdentityTable} = require('../controllers/studentController');

router.get('/',getAllStudents);
router.post('/',addStudent);
router.get('/:id',getStudentById);
router.put('/:id',updateStudent);
router.delete('/:id',deleteStudent);
router.post("/addingStudentWithCard",addingValuesToStudentAndIdentityTable)

module.exports = router;