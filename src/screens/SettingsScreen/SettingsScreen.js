import React from "react";
import { Button } from "react-native-paper";
import { signout } from "../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  async function handleSignout() {
    const resp = await signout();
    const token = await AsyncStorage.removeItem("token");
    console.log(resp, token);
    navigation.navigate("LoginScreen");
  }
  return (
    <Button mode="contained" onPress={handleSignout}>
      Logout
    </Button>
  );
}
