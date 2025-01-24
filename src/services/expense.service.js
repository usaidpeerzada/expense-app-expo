import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveExpenses(data) {
  console.log("><><><", data);
  const token = await AsyncStorage.getItem("token");
  const resp = await axios
    .post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/expense/add-expense`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => ({
      message: err,
    }));
  return resp;
}

export async function deleteExpenses(data) {
  const token = await AsyncStorage.getItem("token");
  const resp = await axios
    .post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/expense/delete-expense`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
  return resp;
}

export async function saveIncome(data) {
  console.log("><><><", data);
  const token = await AsyncStorage.getItem("token");
  const resp = await axios
    .post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/expense/add-income`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
  return resp;
}

export async function handleExpenseTypes(data) {
  let res;
  if (data.expenseType === "expense") {
    res = saveExpenses(data);
  } else if (data.expenseType === "income") {
    res = saveIncome(data);
  } else {
  }
  return res;
}
