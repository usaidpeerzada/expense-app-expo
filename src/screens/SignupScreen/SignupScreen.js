import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signup } from "../../services/auth.service";
import { signupAction, signupError } from "../../actions/actions";
import { useDispatch } from "react-redux";

function SignupScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackbarVisible(false);
  const dispatch = useDispatch();
  async function signUpHandler() {
    if (!email || !password || !username) {
      setSnackbarVisible(true);
      setSnackbarMessage("All fields are mandatory.");
    }

    if (email && password && username) {
      const res = await signup({ username, email, password });
      __DEV__ && console.log("signupHandler() ", res);
      if (res.token) {
        await AsyncStorage.setItem("token", res.token);
        const data = {
          token: res.token,
          userId: res.userId,
          username: res.username,
          emailId: res.emailId,
        };
        dispatch(signupAction(data));
      } else {
        const data = {
          message: res.message,
          status: 400,
        };
        dispatch(signupError(data));
        setSnackbarVisible(true);
        setSnackbarMessage(data?.message);
      }
    }
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text style={styles.headingStyle}>Create an account.</Text>
            <TextInput
              mode="outlined"
              label="Username"
              value={username}
              style={{
                marginLeft: 18,
                marginRight: 18,
                marginTop: 18,
              }}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              style={{
                marginLeft: 18,
                marginRight: 18,
                marginTop: 18,
              }}
              onChangeText={(text) => setPassword(text)}
            />
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
            <Button
              style={styles.ButtonStyle}
              mode="contained"
              onPress={() => signUpHandler(props)}
            >
              <Text style={{ color: "#fff" }}>Sign Up</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  textInput: {
    margin: 18,
    padding: 10,
  },
  headingStyle: {
    color: "#6f4dc5",
    fontSize: 20,
    fontWeight: "bold",
    margin: 18,
  },
  ButtonStyle: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 30,
    color: "rgb(188, 22, 14)",
  },
  footerStyle: {
    color: "grey",
    fontSize: 18,
    margin: 20,
    fontWeight: "bold",
    color: "rgb(188, 22, 14)",
  },
});
export default SignupScreen;
