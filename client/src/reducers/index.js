import {
  GET_EXPENSES_START,
  GET_EXPENSES_COMPLETE,
  REQUEST_ERROR,
  TOGGLE_FORM,
  FIRE_MESSAGE,
} from '../constants/action-types';

const initialState = {
  isLoading: false,
  showForm: false,
  expenses: [],
  message: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSES_START:
      return {
        ...state,
        isLoading: true,
        requestError: null,
      };
    case GET_EXPENSES_COMPLETE:
      return {
        ...state,
        isLoading: false,
        requestError: null,
        expenses: action.payload.expenses,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case TOGGLE_FORM:
      return {
        ...state,
        showForm: action.payload.toggleState,
      };
    case FIRE_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default rootReducer;
