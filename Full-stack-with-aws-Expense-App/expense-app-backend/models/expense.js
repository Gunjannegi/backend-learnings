const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT, // or DECIMAL(10,2) for currency precision
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY, // stores only YYYY-MM-DD
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

module.exports = Expense;
