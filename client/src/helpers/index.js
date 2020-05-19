import { format } from 'date-fns';

const formatDate = date => {
  let formattedDate = date;
  if (date) {
    const timestamp = "M/d/yyyy 'at' HH:mm";
    formattedDate = format(new Date(date), timestamp);
  }
  return formattedDate;
};

const formatTaxes = (amount, percent) => {
  let taxAmount = 0;
  if (amount && percent) {
    taxAmount = (amount * percent / 100);
  }
  return formatCurrency(taxAmount);
};

const formatCurrency = amount => {
  let formattedAmount = amount;
  if (amount) {
    formattedAmount = amount.toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );
  }
  return formattedAmount;
};

export {
  formatDate,
  formatTaxes,
  formatCurrency,
};
