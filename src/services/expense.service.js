import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveExpenses(data) {
  console.log("><><><", data);
  const token = await AsyncStorage.getItem("token");
  const resp = await axios
    .post("http://192.168.1.4:3000/api/expense/add-expense", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      message: err;
    });
  return resp;
}
