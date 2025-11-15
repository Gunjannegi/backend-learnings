const express = require('express');
const { addExpense, getAllExpenses, deleteExpense } = require('../controllers/expenseController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/',authenticate, getAllExpenses);
router.post('/add',authenticate, addExpense);
router.delete('/delete/:id',authenticate, deleteExpense);

module.exports = router;