import { format } from 'date-fns';

const formatDate = date => {
  let formattedDate = date;
  if (date) {
    const timestamp = "iii, MMM d, yyyy 'at' HH:mm";
    formattedDate = format(new Date(date), timestamp);
  }
  return formattedDate;
};

const formatTaxes = (amount, percent) => {
  let tax = 0;
  if (amount && percent) {
    tax = (amount * percent / 100);
  }
  return tax.toFixed(2);
};

const formatCurrency = amount => {
  let formatted = amount;
  if (amount) {
    formatted = amount.toFixed(2);
  }
  return formatted;
};

export {
  formatDate,
  formatTaxes,
  formatCurrency,
};
