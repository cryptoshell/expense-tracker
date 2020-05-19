import { getAllExpenses } from '../api';
import {
  GET_EXPENSES_START,
  GET_EXPENSES_COMPLETE,
  REQUEST_ERROR,
  TOGGLE_FORM,
  FIRE_MESSAGE,
} from '../constants/action-types';

const requestStartAction = type => {
  switch (type) {
    case 'expenses':
      return {
        type: GET_EXPENSES_START,
        payload: {},
      };
    default:
      return {};
  }
};

const requestCompleteAction = (type, data) => {
  switch (type) {
    case 'expenses':
      return {
        type: GET_EXPENSES_COMPLETE,
        payload: {
          expenses: data,
        },
      };
    default:
      return {};
  }
};

const requestErrorAction = requestError => ({
  type: REQUEST_ERROR,
  payload: {
    requestError,
  },
});

export const refreshTable = () => async dispatch => {
  dispatch(requestStartAction('expenses'));

  await getAllExpenses().then(expenses => {
    const { data: { data: list }} = expenses;
    dispatch(requestCompleteAction('expenses', list));
  });
};

export const toggleForm = bool => ({
  type: TOGGLE_FORM,
  payload: {
    toggleState: bool,
  },
});

export const fireMessage = message => {
  return {
    type: FIRE_MESSAGE,
    payload: {
      message,
    },
  };
};
