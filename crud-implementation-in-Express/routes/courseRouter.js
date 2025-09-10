const express = require('express');
const router = express.Router();
const {courses} = require('../constants')

//get all courses
router.get('/',(req,res)=>{
    const extractedCourses = (courses.map(course=>course.name)).join(",");
    res.send(`Courses:${extractedCourses}`);
});

//get Courses by id
router.get('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const course = courses.find(course=>course.id===id);
    if(course){
        res.send(`Course:${course.name}`);
    }else{
        res.status(404).send("Course not found");
    }
})

module.exports = router;