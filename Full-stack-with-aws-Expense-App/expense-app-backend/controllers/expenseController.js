const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../utils/db-connection");

const addExpense = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const userId = req.user.id;
        const { description, amount, date, category } = req.body;

        const expense = await Expense.create(
            { description, amount, date, category, UserId: userId },
            { transaction: t }
        );

        await User.increment(
            { totalExpense: Number(amount) },
            { where: { id: userId }, transaction: t }
        );

        await t.commit();

        return res.status(201).json({
            message: "Expense is successfully added",
            data: expense,
        });

    } catch (err) {
        await t.rollback();
        return res.status(500).json({
            message: "Failed to add expense",
            error: err.message,
        });
    }
};


const getAllExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll({ where: { UserId: userId } });
        if (expenses) {
            return res.status(200).send({ message: "Expenses are fetched successfully", data: expenses })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
};

const deleteExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const userId = req.user.id
        if (!userId) {
            t.rollback();
            return res.status(400).send({ message: "Missing userId in headers" })
        }
        const expense = await Expense.findOne({ where: { id, UserId: userId }, transaction: t });
        if (!expense) {
            t.rollback();
            return res.status(404).send({ message: "Expense not found" });
        }

        await expense.destroy({ transaction: t });

        await User.decrement({ totalExpense: Number(expense.amount) }, { where: { id: userId }, transaction: t });
        await t.commit();
        return res.status(200).send({ message: "Expense is deleted successfully." });

    } catch (err) {
        await t.rollback()
        return res.status(500).send(err)
    }
};

module.exports = { addExpense, getAllExpenses, deleteExpense }