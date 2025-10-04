const Student = require('./student');
const IdentityCard = require('./identitycard');
const Department = require('./department');
const studentCourses = require('./studentCourses');
const courses = require('./courses');

// Associations
//one to one
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

//one to many
Department.hasMany(Student);
Student.belongsTo(Department);

//many to many
Student.belongsToMany(courses,{through:studentCourses});
courses.belongsToMany(Student,{through:studentCourses})


// Export models
module.exports = {
    Student,
    IdentityCard,
    Department,
    courses,studentCourses
};
