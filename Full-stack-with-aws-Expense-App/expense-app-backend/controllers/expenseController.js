const Expense = require("../models/expense");

const addExpense = async (req, res) => {
    try {
        const { description, amount, date, category } = req.body;
        const expense = await Expense.create({
            description, amount, date, category
        })
        if (expense) {
            res.status(201).send({ message: "Expense is successfully added", data: expense })
        }

    } catch (err) {
        res.status(500).send(err)
    }
};

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
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
        const deletedExpense = await Expense.destroy({ where: { id } });
        if (deletedExpense === 0) {
            res.status(404).send({ message: "Expense not found" });
        };
        res.status(200).send({ message: "Expense is deleted successfully." });

    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports = { addExpense, getAllExpenses, deleteExpense }