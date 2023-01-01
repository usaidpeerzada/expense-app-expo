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
import { saveExpenses } from "../../services/expense.service";
import { useDispatch, useSelector } from "react-redux";
import { expensesAction } from "../../actions/auth.action";
export default function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [note, setNote] = useState("");
  const [price, setPrice] = useState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
    if (!selectDate || !price) {
      setSnackbarMessage("Date and expense are required!");
      setSnackbarVisible(true);
      return;
    }
    const data = {
      date: selectDate,
      note: note,
      price: price,
    };
    const res = await saveExpenses(data);
    console.log(">>>", res.data);
    dispatch(expensesAction(res.data));
    if (res !== "") {
      setSnackbarMessage(res.message);
      setSnackbarVisible(true);
    }
  }
  return (
    <>
      <Title
        style={{
          marginBottom: 10,
          marginTop: 20,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Add expenses
      </Title>
      <View style={{ margin: 20 }}>
        <Paragraph style={{ marginBottom: 10 }}>Date </Paragraph>
        <Button
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
        )}
        <Paragraph style={{ marginBottom: 10 }}>Add note</Paragraph>
        <TextInput
          mode="outlined"
          style={{ marginBottom: 10 }}
          label="Note"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <Paragraph style={{ marginBottom: 10 }}>Add expense</Paragraph>
        <TextInput
          mode="outlined"
          style={{ marginBottom: 10 }}
          label="Expense"
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
});
