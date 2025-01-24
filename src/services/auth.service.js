import axios from "axios";

export async function login(data) {
  try {
    const { email, password } = data;
    if (!email || !password) {
      return { message: "both fields are required!" };
    }
    const resp = await axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/signin`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return { message: err };
      });
    return resp;
  } catch (err) {
    console.log("axios login -> ", err);
  }
}

export async function signout() {
  const resp = await axios
    .post(`${process.env.EXPO_PUBLIC_API_URL}/signout`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: err };
    });
  return resp;
}

export async function signup({ username, email, password }) {
  if (!username || !password || !email) {
    alert("Username, email and password are mandatory!");
    return;
  }
  const data = { username, email, password };
  const resp = await axios
    .post(`${process.env.EXPO_PUBLIC_API_URL}/signup`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      __DEV__ && console.log("axios err in signup()", err && err.response);
      return {
        message: err?.response?.data?.message || "User creation failed",
      };
    });
  return resp;
}
