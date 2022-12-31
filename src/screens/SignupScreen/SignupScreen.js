import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignupScreen(props) {
  const PURPLE_SHADE = "#8e97fd";
  const LIGHT_GRAY = "#D3D3D3";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [focus, setFocus] = useState(false);

  const signUpHandler = async (props) => {
    if (!username || !password || !email) {
      alert("Username, email and password are mandatory!");
    }
    fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        phone: phone,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("the data", data);
        try {
          // await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem("idOfUser", data?.userId);
          props.navigation.replace("home");
        } catch (err) {
          console.log("sign up unsucessful ->", err);
        }
      });
  };

  const handleFocus = (event) => {
    setFocus(true);
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setFocus(false);
    if (props.onBlur) {
      props.onBlur(event);
    }
  };
  return (
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
  );
}

const styles = StyleSheet.create({
  textInput: {
    margin: 18,
    padding: 10,
  },
  headingStyle: {
    color: "rgb(188, 22, 14)",
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
