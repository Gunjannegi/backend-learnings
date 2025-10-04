const Student = require('./student');
const IdentityCard = require('./identitycard');
const Department = require('./department');

// Associations
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

Department.hasMany(Student);
Student.belongsTo(Department);

// Export models
module.exports = {
    Student,
    IdentityCard,
    Department,
};
