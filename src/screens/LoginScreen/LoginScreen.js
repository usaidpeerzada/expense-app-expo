import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { login } from "../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loginAction, loginError } from "../../actions/actions";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch();
  const onDismissSnackBar = () => setSnackbarVisible(false);
  async function handleLogin() {
    if (!email || !password) {
      setSnackbarVisible(true);
      setSnackbarMessage("Please enter email and password.");
    }
    console.log(email, password);
    if (email && password) {
      let data = { email, password };
      const res = await login(data);
      console.log(res);
      if (res.token) {
        await AsyncStorage.setItem("token", res.token);
        const data = {
          token: res.token,
          userId: res.userId,
          username: res.username,
          emailId: res.emailId,
        };
        dispatch(loginAction(data));
      } else {
        const data = {
          message: res.message,
          status: res.status,
        };
        dispatch(loginError(data));
        setSnackbarVisible(true);
        setSnackbarMessage(data?.message || "Failed to login");
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
            fontSize: 25,
            marginLeft: 18,
            marginTop: 20,
            color: "#3b3b3b",
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            marginLeft: 18,
            color: "#6f4dc5",
          }}
        >
          Expent
        </Text>
        <View />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 18,
            marginTop: 20,
            color: "#6f4dc5",
          }}
        >
          Login with email
        </Text>
        <TextInput
          mode="outlined"
          label="Email"
          autoCapitalize="none"
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
          tyoe="password"
          autoCapitalize="none"
          secureTextEntry={hidePass ? true : false}
          value={password}
          right={
            <TextInput.Icon
              icon={hidePass ? "eye" : "eye-off"}
              onPress={() => setHidePass(!hidePass)}
            />
          }
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Ok",
          onPress: () => {
            // Do something
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
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
