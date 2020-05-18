import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createExpense = payload => api.post(`/expense`, payload);
export const getAllExpenses = () => api.get(`/expenses`);
export const updateExpenseById = (id, payload) => api.put(`/expense/${id}`, payload);
export const deleteExpenseById = id => api.delete(`/expense/${id}`);
export const getExpenseById = id => api.get(`/expense/${id}`);

const apis = {
  createExpense,
  getAllExpenses,
  updateExpenseById,
  deleteExpenseById,
  getExpenseById,
};

export default apis;
