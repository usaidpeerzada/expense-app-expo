import React from "react";
import { StyleSheet, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen/SignupScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createMaterialBottomTabNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(188, 22, 14)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 218, 213)",
    onPrimaryContainer: "rgb(65, 0, 0)",
    secondary: "rgb(119, 86, 81)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 218, 213)",
    onSecondaryContainer: "rgb(44, 21, 18)",
    tertiary: "rgb(112, 92, 46)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(252, 223, 166)",
    onTertiaryContainer: "rgb(37, 26, 0)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 25)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 25)",
    surfaceVariant: "rgb(245, 221, 218)",
    onSurfaceVariant: "rgb(83, 67, 65)",
    outline: "rgb(133, 115, 112)",
    outlineVariant: "rgb(216, 194, 190)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 46)",
    inverseOnSurface: "rgb(251, 238, 236)",
    inversePrimary: "rgb(255, 180, 168)",
    elevation: {
      level0: "transparent",
      level1: "rgb(252, 240, 243)",
      level2: "rgb(250, 233, 236)",
      level3: "rgb(248, 226, 229)",
      level4: "rgb(247, 224, 226)",
      level5: "rgb(246, 219, 221)",
    },
    surfaceDisabled: "rgba(32, 26, 25, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 25, 0.38)",
    backdrop: "rgba(59, 45, 43, 0.4)",
  },
};

export default function App() {
  const [isSignedIn, setSignedIn] = React.useState(false);
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  };
  React.useEffect(() => {
    detectLogin();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="LoginScreen">
          {isSignedIn ? (
            <>
              <Tab.Screen
                name="Expense"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Expense",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="cash-multiple"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Calendar"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Calendar",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="calendar"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Report"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Report",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="chart-arc"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  tabBarLabel: "Settings",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="account-cog"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  tabBarLabel: "Login",
                  tabBarIcon: ({ color }) => (
                    <AntDesign name="login" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{
                  tabBarLabel: "Sign up",
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="person-add" color={color} size={26} />
                  ),
                }}
              />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
      {/* <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      /> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
