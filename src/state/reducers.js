import { AUTH, EXPENSES } from "../actions/auth.action";
import { combineReducers } from "redux";

const auth = (auth = { authToken: "" }, action) => {
  switch (action.type) {
    case AUTH:
      return { authToken: action.data };
    default:
      return auth;
  }
};
const expenses = (state, action) => {
  switch (action.type) {
    case EXPENSES:
      return { ...state, expenses: action.data };
    default:
      return expenses;
  }
};
export default combineReducers({ auth, expenses });
