import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB, Card, Title, Text, Divider } from "react-native-paper";
import { categories } from "../../../utils/custom-configs";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserExpenses,
  getUserIncome,
  setCurrency,
} from "../../actions/actions";
import {
  getCurrentUserExpenses,
  getCurrentUserIncome,
} from "../../services/user.service";
import {
  isToday,
  getBalanceFromExpenses,
  totalExpenses,
} from "../../../utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const currentUserExpenses = useSelector(
    (state) => state.expenses.currentUserExpenses
  );
  const currentUserIncome = useSelector(
    (state) => state.expenses.currentUserIncome
  );
  const currency = useSelector((state) => state.expenses.currency);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  useEffect(() => {
    async function userExpenses() {
      const userExpenses = await getCurrentUserExpenses();
      dispatch(getUserExpenses(userExpenses));
    }
    userExpenses();
  }, []);
  useEffect(() => {
    async function userIncome() {
      const userExpenses = await getCurrentUserIncome();
      dispatch(getUserIncome(userExpenses));
    }
    userIncome();
    async function getCurrentCurrencySymbol() {
      const getCurrentCurrency = await AsyncStorage.getItem(
        "currentCurrencySymbol"
      );
      dispatch(setCurrency(getCurrentCurrency || "$"));
    }
    getCurrentCurrencySymbol();
  }, [currency]);

  const todaysExpenses = currentUserExpenses
    ?.map((exp) => {
      const isTodaysExpense = isToday(exp?.createdAt);
      if (isTodaysExpense) {
        return exp;
      }
    })
    ?.filter(Boolean);
  const totalExpensesAmount = totalExpenses(currentUserExpenses) || 0;
  const todaysTotalExp = totalExpenses(todaysExpenses);
  const balance =
    getBalanceFromExpenses({
      expensePrice: totalExpensesAmount,
      incomePrice: currentUserIncome && currentUserIncome[0]?.price,
    }) || 0;
  const totalIncome = totalExpenses(currentUserIncome);
  return (
    <ScrollView>
      <Title
        style={{
          marginBottom: 10,
          marginTop: 20,
          marginLeft: 30,
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        Hello, {username}
      </Title>
      <View style={{ margin: 20 }}>
        <Card mode="outlined" style={{ display: "flex" }}>
          <Card.Content
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View>
              <Text style={{ color: "#E53935" }}>
                -{currency}
                {totalExpensesAmount}
              </Text>
              <Text variant="bodyMedium" style={{ color: "#616161" }}>
                Expenses
              </Text>
            </View>

            <View>
              <Text>
                {currency}
                {balance}
              </Text>
              <Text variant="bodyMedium" style={{ color: "#616161" }}>
                Balance
              </Text>
            </View>
            <View>
              <Text style={{ color: "green" }}>
                {currency}
                {totalIncome && totalIncome}
              </Text>
              <Text variant="bodyMedium" style={{ color: "#616161" }}>
                Income
              </Text>
            </View>
          </Card.Content>
        </Card>
        <Card mode="outlined" style={{ display: "flex", marginTop: 20 }}>
          <Card.Content
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 8,
            }}
          >
            <View>
              <Text style={{ fontWeight: "700" }} variant="bodyMedium">
                Today
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "700" }} variant="bodyMedium">
                -{currency}
                {todaysTotalExp || 0}
              </Text>
            </View>
          </Card.Content>
          <Card.Content>
            <Divider />
            {todaysExpenses?.map((exp, id) => {
              const cats = categories.find(
                (item) => item.key === exp?.category
              );
              return (
                <View
                  key={id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "space-between",
                  }}
                >
                  {/* <View>
                    <Button icon={cats?.icon ? cats?.icon : "cash"}></Button>
                  </View> */}
                  <View>
                    <Text>{exp?.note}</Text>
                    <Text style={{ fontWeight: "700" }}>{cats?.label}</Text>
                  </View>
                  <View>
                    <Text style={{ color: "#E53935" }}>
                      - {currency}
                      {exp?.price}
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card.Content>
        </Card>
      </View>
      <View>
        <FAB
          size="large"
          icon="plus"
          label="Add item"
          style={styles.fab}
          onPress={() => navigation.navigate("AddExpense")}
        />
      </View>
      {/* <Snackbar
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
      </Snackbar> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 50,
  },
  submitBtn: {
    marginTop: 30,
  },
  fab: {
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 20,
    // top: 415,
  },
});
