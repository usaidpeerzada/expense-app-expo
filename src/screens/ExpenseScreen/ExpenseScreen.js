import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Title,
  TextInput,
  Paragraph,
  Snackbar,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  saveExpenses,
  handleExpenseTypes,
} from "../../services/expense.service";
import { useDispatch, useSelector } from "react-redux";
import {
  expensesAction,
  getUserExpenses,
  getUserIncome,
} from "../../actions/actions";
import { Picker } from "@react-native-picker/picker";
import { expenseTypes, categories } from "../../../utils/custom-configs";
import {
  getCurrentUserExpenses,
  getCurrentUserIncome,
} from "../../services/user.service";

export default function ExpenseScreen() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [note, setNote] = useState("");
  const [price, setPrice] = useState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const onChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setSelectDate(currentDate.toDateString());
  };
  const state = useSelector((state) => state);
  console.log("state -> ", state);
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const onDismissSnackBar = () => setSnackbarVisible(false);
  async function handleSubmit() {
    if (!price) {
      setSnackbarMessage("Expense is required!");
      setSnackbarVisible(true);
      return;
    }
    const data = {
      //   date: selectDate,
      note: note,
      price: price,
      expenseType: expenseType,
      category: selectedCategory ? selectedCategory : "",
    };
    const res = await handleExpenseTypes(data);
    async function userExpenses() {
      const userExpenses = await getCurrentUserExpenses();
      dispatch(getUserExpenses(userExpenses));
    }
    async function userIncome() {
      const userExpenses = await getCurrentUserIncome();
      dispatch(getUserIncome(userExpenses));
    }
    userIncome();
    userExpenses();
    dispatch(expensesAction(res.data));
    if (res !== "") {
      setSnackbarMessage(res.message);
      setSnackbarVisible(true);
    }
  }
  //   const screenWidth = Dimensions.get("window").width;
  console.log("expt -> ", expenseType);
  return (
    <>
      <View style={{ margin: 20 }}>
        {/* <Paragraph style={{ marginBottom: 10 }}>Date </Paragraph> */}
        {/* <Button
          style={{ marginBottom: 10 }}
          icon="calendar"
          mode="contained-tonal"
          onPress={showDatepicker}
        >
          {selectDate ? selectDate : "Select Date"}
        </Button>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            minimumDate={new Date()}
            mode={mode}
            is24Hour={true}
            onChange={onChangeHandler}
          />
        )} */}
        <Paragraph style={{ marginBottom: 10 }}>Type</Paragraph>
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={expenseType}
            onValueChange={(itemValue, itemIndex) => setExpenseType(itemValue)}
          >
            <Picker.Item label="Choose expense type" enabled={false} />
            {expenseTypes.map((type, id) => (
              <Picker.Item key={id} label={type.label} value={type.value} />
            ))}
          </Picker>
        </View>
        {expenseType === "expense" ? (
          <>
            <Paragraph style={{ marginBottom: 10 }}>Category</Paragraph>
            <View style={styles.pickerStyle}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }
              >
                {categories.map((type, id) => (
                  <Picker.Item key={id} label={type.label} value={type.value} />
                ))}
              </Picker>
            </View>
          </>
        ) : null}
        <Paragraph style={{ marginBottom: 10 }}>Add note</Paragraph>
        <TextInput
          mode="outlined"
          style={{ marginBottom: 10 }}
          label="Note"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <Paragraph style={{ marginBottom: 10 }}>
          {expenseType === "income" ? "Add income" : "Add expense"}
        </Paragraph>
        <TextInput
          mode="outlined"
          style={{ marginBottom: 10 }}
          label={expenseType === "income" ? "Income" : "Expense"}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <Button
          mode="contained"
          style={styles.submitBtn}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </View>
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
  cardStyle: {
    marginTop: 50,
  },
  submitBtn: {
    marginTop: 30,
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: "rgba(155,155,155,1)",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
  },
});
