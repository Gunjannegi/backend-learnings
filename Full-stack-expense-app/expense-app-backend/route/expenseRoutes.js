const express = require('express');
const router = express.Router();
const {addExpense, getAllExpenses, deleteExpense, updateExpense} = require('../controller/expenseController');
router.post('/add',addExpense);
router.get('/getAllExpenses',getAllExpenses);
router.delete('/delete/:id',deleteExpense);
router.put('/update/:id',updateExpense);
module.exports = router;
