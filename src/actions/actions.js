export const AUTH = "AUTH";
export const AUTH_ERROR = "AUTH_ERROR";
export const EXPENSES = "EXPENSES";
export const GET_USER_EXPENSES = "GET_USER_EXPENSES";
export const GET_USER_INCOME = "GET_USER_INCOME";
export const SET_CURRENCY = "SET_CURRENCY";

export const loginAction = (data) => ({
  type: AUTH,
  data: data,
});

export const loginError = (data) => ({
  type: AUTH_ERROR,
  data: data,
});
export const signupAction = (data) => ({
  type: AUTH,
  data: data,
});

export const signupError = (data) => ({
  type: AUTH_ERROR,
  data: data,
});

export const expensesAction = (data) => ({
  type: EXPENSES,
  data: data,
});

export const getUserExpenses = (data) => ({
  type: GET_USER_EXPENSES,
  data: data,
});
export const getUserIncome = (data) => ({
  type: GET_USER_INCOME,
  data: data,
});

export const setCurrency = (data) => ({
  type: SET_CURRENCY,
  data: data,
});
