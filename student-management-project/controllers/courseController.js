const { Student, courses } = require('../models');
const Course = require('../models/courses')
const addCourse = async(req,res)=>{
   try{
    const {name} = req.body;
    const course = await Course.create({'name':name});
    res.json(course);
   }catch(err){
    res.status(500).json({'error':err.message})
   }
}

const addStudentsToCourses = async(req,res)=>{
    try{
     const {studentId,courseIds} = req.body;
     const student = await Student.findByPk(studentId);
     const courses = await Course.findAll({where:{id:courseIds}})
     await student.addCourse(courses);
     const updatedStudent = await Student.findByPk(studentId,{include:Course});
     res.status(200).json(updatedStudent);
    }catch(err){
    res.status(500).send(err)
    }
}

module.exports = {addCourse,addStudentsToCourses}