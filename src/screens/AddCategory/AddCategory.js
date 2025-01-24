import React, { useState } from "react";
import { View } from "react-native";
import { Title, TextInput, Button } from "react-native-paper";
export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  function handleSubmit() {}
  return (
    <View style={{ marginLeft: 8, marginRight: 8 }}>
      {/* <Title style={{ color: "#6f4dc5", marginTop: 10, marginBottom: 10 }}>
        *this page is still under works.{" "}
      </Title> */}
      <Title style={{ color: "#6f4dc5", marginTop: 10, marginBottom: 10 }}>
        Add a new category
      </Title>
      <TextInput
        mode="outlined"
        style={{ marginBottom: 10 }}
        label="Category name"
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />
      <Button mode="contained" style={{ marginTop: 20 }} onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
}
