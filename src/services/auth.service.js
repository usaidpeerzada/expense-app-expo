import axios from "axios";

export async function login(data) {
  try {
    const { email, password } = data;
    if (!email || !password) {
      return { message: "both fields are required!" };
    }
    const resp = await axios
      .post(`http://192.168.1.4:3000/signin`, data, {
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
    .post(`http://192.168.1.6:3000/signout`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: err };
    });
  return resp;
}
export async function signup() {}
