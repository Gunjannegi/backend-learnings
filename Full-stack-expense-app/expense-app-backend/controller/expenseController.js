const Expense = require('../models/expenses');
const addExpense = async (req, res) => {
    try {
        const { price, description, category } = req.body;
        const expense = await Expense.create({
            price: price,
            category: category,
            description: description
        });
        res.status(201).send("Expense has been added successfully");

    } catch (err) {
        res.status(500).send(err);
    }

};

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        if (expenses.length > 0) {
            res.status(200).send(expenses);
            return;
        }
        res.status(404).send("No expense found")
    } catch (err) {
        res.status(500).send(err);
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.destroy({ where: { id: id } });
        if (expense === 0) {
            res.status(404).send("Expense not found.");
            return;
        }
        res.status(200).send("Expense has been deleted");

    } catch (err) {
        res.status(500).send(err);
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, price, description } = req.body;
        const expense = await Expense.findOne({ where: { id: id } });
        if (!expense) {
            res.status(404).send("Expense not found");
            return;
        }
        expense.category = category;
        expense.price = price;
        expense.description = description;
        await expense.save();
        res.send(200).send("Expense has been updated",expense)
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { addExpense, getAllExpenses, deleteExpense, updateExpense };
