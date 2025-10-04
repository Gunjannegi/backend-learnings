const express = require('express');
const router = express.Router();
const {addCourse, addStudentsToCourses} = require('../controllers/courseController');

router.post('/',addCourse);
router.get('/addStudentCourses',addStudentsToCourses)

module.exports = router;