const express = require('express');
const { addExpense, getAllExpenses, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();

router.get('/', getAllExpenses);
router.post('/add',addExpense);
router.delete('/delete/:id',deleteExpense);

module.exports = router;