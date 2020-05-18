const express = require('express');
const {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
  getExpenses, 
} = require('../controllers/expense-ctrl');

const router = express.Router();

router.post('/expense', createExpense);
router.put('/expense/:id', updateExpense);
router.delete('/expense/:id', deleteExpense);
router.get('/expense/:id', getExpenseById);
router.get('/expenses', getExpenses);

module.exports = router;

