import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Divider, FAB, Text, Card } from "react-native-paper";
import { categories } from "../../../utils/custom-configs";

export default function ManageCategories({ navigation }) {
  return (
    <View>
      <Card mode="outlined" style={{ margin: 10, marginBottom: 90 }}>
        <Card.Content>
          <ScrollView
            style={{
              display: "flex",
            }}
          >
            {categories?.map((cat, id) => (
              <View key={id}>
                {/* <Divider /> */}
                <Text
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                  variant="labelLarge"
                >
                  {cat.label}
                </Text>
                <Divider />
              </View>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>
      <FAB
        size="large"
        icon="plus"
        label="Add category"
        style={styles.fab}
        onPress={() => navigation.navigate("AddCategory")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    marginTop: 10,
    marginRight: 0,
    marginBottom: 10,
    marginLeft: 0,
    top: 615,
    left: 110,
  },
});
