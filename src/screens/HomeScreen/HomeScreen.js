import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
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

export default function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [note, setNote] = useState("");
  const [price, setPrice] = useState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const onChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setSelectDate(currentDate.toDateString());
  };

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
    if (res !== "") {
      setSnackbarMessage(res);
      setSnackbarVisible(true);
    }
  }
  return (
    <>
      <Card style={styles.cardStyle}>
        {/* <Card.Title>hehy</Card.Title> */}
        <Card.Content style={{ margin: 20 }}>
          <Title style={{ marginBottom: 10 }}>Add expenses</Title>
          <Paragraph style={{ marginBottom: 10 }}>Date: </Paragraph>
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
        </Card.Content>
      </Card>
      <Button mode="contained" style={styles.submitBtn} onPress={handleSubmit}>
        Submit
      </Button>
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
    margin: 30,
  },
});
