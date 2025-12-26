const Expense = require("../models/expense");
const User = require("../models/user");

const addExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { description, amount, date, category } = req.body;
        const expense = await Expense.create({
            description, amount, date, category, UserId: userId
        })
        if (expense) {
            await User.increment(
                { totalExpense: Number(amount) },
                { where: { id: userId } }
            );
            res.status(201).send({ message: "Expense is successfully added", data: expense })
        }

    } catch (err) {
        res.status(500).send(err)
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
        res.status(500).send(err)
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id
        if (!userId) {
            res.status(400).send({ message: "Missing userId in headers" })
        }
        const deletedExpense = await Expense.destroy({ where: { id, userId } });
        if (deletedExpense === 0) {
            res.status(404).send({ message: "Expense not found" });
        };
        res.status(200).send({ message: "Expense is deleted successfully." });

    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports = { addExpense, getAllExpenses, deleteExpense }