const Expense = require('../models/expense-model');

const createExpense = (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an expense',
    });
  }

  const expense = new Expense(body);
  if (!expense) {
    return res.status(400).json({ success: false, error: err });
  }

  expense
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: expense._id,
        message: 'Expense created!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Expense not created!',
      })
    });
};

const updateExpense = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Expense.findOne({ _id: req.params.id }, (err, expense) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Expense not found!',
      });
    }
    const { description, amount, date } = body;
    expense.description = description;
    expense.amount = amount;
    expense.date = date;
    expense
      .save()
      .then(() => {
        return res.status(200).json({
            success: true,
            id: expense._id,
            message: 'Expense updated!',
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Expense not updated!',
        });
      });
  });
};

const deleteExpense = async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id }, (err, expense) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, error: 'Expense not found' });
    }

    return res.status(200).json({ success: true, data: expense });
  }).catch(err => console.log(err));
};

const getExpenseById = async (req, res) => {
  await Expense.findOne({ _id: req.params.id }, (err, expense) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, error: `Expense not found` });
    }
    return res.status(200).json({ success: true, data: expense });
  }).catch(err => console.log(err));
};

const getExpenses = async (req, res) => {
  await Expense.find({}, (err, expenses) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: expenses });
  }).catch(err => console.log(err));
};

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
};
