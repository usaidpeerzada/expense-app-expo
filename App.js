import React from "react";
import { StyleSheet } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Provider } from "react-redux";
import { store, persistor } from "./src/state/store";
import { PersistGate } from "redux-persist/integration/react";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen/SignupScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarScreen from "./src/screens/CalendarScreen/CalendarScreen";
import ReportScreen from "./src/screens/ReportScreen/ReportScreen";
import ExpenseScreen from "./src/screens/ExpenseScreen/ExpenseScreen";
import ManageCategories from "./src/screens/ManageCategories/ManageCategories";
import ManageCurrency from "./src/screens/ManageCurrency/ManageCurrency";
import AddCategory from "./src/screens/AddCategory/AddCategory";
const Tab = createMaterialBottomTabNavigator();
const ExpenseScreenNav = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const [token, setToken] = React.useState("");
  const [isSignedIn, setSignedIn] = React.useState(false);
  async function getToken() {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  }
  const detectLogin = async () => {
    if (token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      getToken();
    }, 1000);
    detectLogin();
    return () => clearInterval(interval);
  }, [token]);
  function AuthTabs() {
    return (
      <Tab.Navigator>
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
      </Tab.Navigator>
    );
  }
  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={{
            title: "Report",
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
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-cog"
                color={color}
                size={26}
              />
            ),
          }}
        />
        {/* <Tab.Screen
                    name="Calendar"
                    component={CalendarScreen}
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
                    /> */}
      </Tab.Navigator>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <ExpenseScreenNav.Navigator>
              <ExpenseScreenNav.Group>
                {isSignedIn ? (
                  <>
                    <ExpenseScreenNav.Screen
                      name="HomeTabs"
                      component={HomeTabs}
                      options={{
                        title: "Expenses",
                      }}
                    />
                    <ExpenseScreenNav.Screen
                      name="AddExpense"
                      options={{
                        title: "Add expenses",
                      }}
                      component={ExpenseScreen}
                    />

                    <ExpenseScreenNav.Screen
                      name="ManageCategories"
                      component={ManageCategories}
                      options={{
                        title: "Categories",
                      }}
                    />
                    <ExpenseScreenNav.Screen
                      name="ManageCurrency"
                      component={ManageCurrency}
                      options={{
                        title: "Manage currency",
                      }}
                    />
                    <ExpenseScreenNav.Screen
                      name="AddCategory"
                      component={AddCategory}
                      options={{
                        title: "Add category",
                      }}
                    />
                  </>
                ) : (
                  <ExpenseScreenNav.Screen
                    name="LoginScreen"
                    component={AuthTabs}
                    options={{
                      headerShown: false,
                      tabBarLabel: "Login",
                      tabBarIcon: ({ color }) => (
                        <AntDesign name="login" color={color} size={26} />
                      ),
                    }}
                  />
                )}
              </ExpenseScreenNav.Group>
            </ExpenseScreenNav.Navigator>
          </NavigationContainer>
          {/* <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      /> */}
        </PersistGate>
      </Provider>
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
