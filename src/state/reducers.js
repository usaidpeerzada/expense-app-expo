import {
  AUTH,
  AUTH_ERROR,
  EXPENSES,
  GET_USER_EXPENSES,
  GET_USER_INCOME,
  SET_CURRENCY,
} from "../actions/actions";
import { combineReducers } from "redux";

const auth = (auth = { authToken: "" }, action) => {
  switch (action.type) {
    case AUTH:
      return {
        authToken: action.data.token,
        userId: action.data.userId,
        username: action.data.username,
        emailId: action.data.emailId,
      };
    case AUTH_ERROR:
      return {
        errorMsg: action.data.message,
        isLoading: false,
        status: action.data.status,
      };
    default:
      return auth;
  }
};
const expenses = (state, action) => {
  switch (action.type) {
    case EXPENSES:
      return { ...state, expenses: action.data };
    case GET_USER_EXPENSES:
      return { ...state, currentUserExpenses: action.data };
    case GET_USER_INCOME:
      return { ...state, currentUserIncome: action.data };
    case SET_CURRENCY:
      return { ...state, currency: action.data };
    default:
      return expenses;
  }
};
export default combineReducers({ auth, expenses });
