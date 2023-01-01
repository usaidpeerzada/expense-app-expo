import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { login } from "../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loginAction } from "../../actions/auth.action";
export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleLogin() {
    if (email && password) {
      let data = { email, password };
      const res = await login(data);
      console.log(res);
      if (res.token) {
        await AsyncStorage.setItem("token", res.token);
        dispatch(loginAction(res.token));
      } else {
        console.log("sheesh");
      }
    }
  }

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar barStyle="light-content" />
        {/* <WelcomeModal showModal={true} /> */}
        {/* <Image
          source={require("../images/login.png")}
          style={{ width: "auto", height: 200 }}
        /> */}
        <Text
          style={{
            fontSize: 35,
            marginLeft: 18,
            marginTop: 10,
            color: "#3b3b3b",
          }}
        >
          welcome to
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: 18,
            color: "rgb(188, 22, 14)",
          }}
        >
          ExpenseTrak
        </Text>
        <View />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 18,
            marginTop: 20,
            color: "rgb(119, 86, 81)",
          }}
        >
          Login with email
        </Text>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            marginLeft: 18,
            marginRight: 18,
            marginTop: 18,
          }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{
            marginLeft: 18,
            marginRight: 18,
            marginTop: 18,
          }}
        />
        <View style={styles.ButtonStyle}>
          <Button mode="contained" onPress={handleLogin}>
            Login
          </Button>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  ButtonStyle: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 25,
  },
});
