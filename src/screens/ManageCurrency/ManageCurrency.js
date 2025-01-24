import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { currencies } from "../../../utils/custom-configs";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Paragraph } from "react-native-paper";

export default function ManageCurrency() {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  async function saveCurrencySymbolInAsyncStorage(val) {
    if (val) {
      await AsyncStorage.setItem("currentCurrencySymbol", val);
    } else {
      return;
    }
  }
  async function initialValueForCurrency() {
    const getOldValue = await AsyncStorage.getItem("currentCurrencySymbol");
    setSelectedCurrency(getOldValue);
  }
  initialValueForCurrency();
  return (
    <View
      style={{
        display: "flex",
        margin: 10,
      }}
    >
      <Paragraph>
        Select a currency symbol and it will automatically be set as default!
      </Paragraph>
      <View style={styles.pickerStyle}>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCurrency(itemValue);
            saveCurrencySymbolInAsyncStorage(itemValue);
          }}
        >
          {currencies.map((type, id) => (
            <Picker.Item
              key={id}
              label={`${type.symbol} ${type.name}`}
              value={type.symbol}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerStyle: {
    borderWidth: 1,
    borderColor: "rgba(155,155,155,1)",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
  },
});
