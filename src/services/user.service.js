import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getCurrentUserExpenses() {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("tokem", token);
    const resp = await axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/get-user-expenses`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log("axios err in getcurrentuser()", err));
    return resp;
  } catch (err) {
    console.log("error in gettin current user exp -> ", err);
  }
}
export async function getCurrentUserIncome() {
  try {
    const token = await AsyncStorage.getItem("token");
    const resp = await axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/get-user-income`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log("axios err in getcurrentuserIncome()", err));
    console.log("THE RESPO FOR USER INCOME ->> ", resp);
    return resp;
  } catch (err) {
    console.log("error in gettin current user income -> ", err);
  }
}
