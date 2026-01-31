const express = require('express');
const { addExpense, getAllExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/',authenticate, getAllExpenses);
router.post('/add',authenticate, addExpense);
router.put('/:id',authenticate, updateExpense);
router.delete('/delete/:id',authenticate, deleteExpense);

module.exports = router;