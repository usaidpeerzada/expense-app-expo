export function isToday(date) {
  const today = new Date();
  const formattedDate = new Date(date) ? new Date(date) : date;
  if (formattedDate) {
    if (today?.toDateString() === formattedDate?.toDateString()) {
      return true;
    }
  }
  return false;
}

export function totalExpenses(expenseData) {
  return expenseData?.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.price,
    0
  );
}

export function getBalanceFromExpenses(data) {
  const { expensePrice, incomePrice } = data;
  const balance = incomePrice - expensePrice;
  return balance;
}

export function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];
    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}
