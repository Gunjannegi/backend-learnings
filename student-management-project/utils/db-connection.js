const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'root', 'Gunjan@sql', {
  host: 'localhost',
  dialect: 'mysql'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to tha Database has been created");
  } catch (error) {
    console.log(error);
  }
}
)();

module.exports = sequelize;