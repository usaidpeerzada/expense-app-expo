export const AUTH = "AUTH";
export const EXPENSES = "EXPENSES";

export const loginAction = (data) => ({
  type: AUTH,
  data: data,
});

export const expensesAction = (data) => ({
  type: EXPENSES,
  data: data,
});
