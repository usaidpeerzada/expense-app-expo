import React, { useEffect } from "react";
import { Text, Divider, Surface, List, FAB } from "react-native-paper";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { useSelector } from "react-redux";
import { categories } from "../../../utils/custom-configs";
import * as FileSystem from "expo-file-system";

export default function ReportScreen({ navigation }) {
  const currentUserExpenses = useSelector(
    (state) => state.expenses.currentUserExpenses
  );
  const currency = useSelector((state) => state.expenses.currency);
  const totalPriceByCategory = (currentUserExpenses || [])?.reduce(
    (acc, expense) => {
      const category = expense.category;
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(expense);
      }
      return acc;
    },
    {}
  );
  const downloadReport = async () => {
    // Format the report data as text
    const reportText = `Report Data:
      Total Expenses: ${100}
      Todays Expenses: ${100}
      Balance: ${100}`;

    try {
      // Get the document directory URI
      const directoryUri = FileSystem.documentDirectory;
      // Define the file URI
      const fileUri = `${directoryUri}report.txt`;
      // Write the report data to a text file
      await FileSystem.writeAsStringAsync(fileUri, reportText);
      console.log("Report downloaded successfully.");
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };
  const priceAndCat = currentUserExpenses
    ?.filter((f) => f.category)
    ?.map((d) => {
      return {
        category: d.category,
        price: d.price,
        note: d.note,
      };
    });
  useEffect(() => {}, [currentUserExpenses]);
  const totalPrice = priceAndCat?.reduce((acc, { category, price }, index) => {
    let temp = acc.find((o) => o.category === category);
    if (temp) {
      temp.price += price;
    } else {
      acc.push({
        key: index,
        category,
        price,
        svg: { fill: categories?.find((c) => c.key === category)?.color },
      });
    }
    return acc;
  }, []);
  function calculateTotalSum() {
    let totalSum = 0;
    (currentUserExpenses || []).forEach((expense) => {
      const price = expense.price;

      if (!isNaN(price)) {
        totalSum += price;
      }
    });
    return totalSum;
  }
  const totalSumOfExpenses = calculateTotalSum();
  console.log("total pric eb ", totalPriceByCategory);
  return (
    <>
      <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
        {/* <Button onPress={handleClear}>
        <Text>Clear</Text>
      </Button> */}
        {(totalPrice || [0])?.length > 0 ? (
          ""
        ) : (
          <View style={{ marginBottom: 70 }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              source={require("../../utils/report-svg.png")}
            />
            <Text
              variant="labelLarge"
              style={{
                color: "#6f4dc5",
                marginLeft: "auto",
                marginTop: 10,
                marginRight: "auto",
              }}
            >
              - Report will show here once you add expenses.
            </Text>
          </View>
        )}
        {totalPrice ? (
          <PieChart
            style={{
              height: 200,
            }}
            valueAccessor={({ item }) => item.price}
            data={totalPrice || [0]}
            spacing={0}
            outerRadius={"95%"}
          ></PieChart>
        ) : (
          ""
        )}
        <Surface style={styles.surface} elevation={3}>
          <Text>
            Total amount spent: {currency}
            {totalSumOfExpenses}
          </Text>
        </Surface>
        {Object.keys(totalPriceByCategory).map((category, index) => {
          return (
            <React.Fragment key={index}>
              <List.Section>
                <List.Accordion
                  title={categories.find((cat) => cat.key === category).label}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      color={
                        categories.find((cat) => cat.key === category).color
                      }
                      icon={categories.find((cat) => cat.key === category).icon}
                    />
                  )}
                >
                  {totalPriceByCategory[category].map((item, itemIndex) => (
                    <List.Item
                      key={itemIndex}
                      title={() => (
                        <Text variant="titleMedium">{item.note}</Text>
                      )}
                      style={{
                        position: "relative",
                        right: 40,
                      }}
                      description={() => (
                        <>
                          <Text variant="labelMedium">
                            Purchased on:{" "}
                            {
                              new Date(item.createdAt)
                                .toISOString()
                                .split("T")[0]
                            }
                          </Text>
                          <Text variant="labelLarge">
                            {currency + item.price}
                          </Text>
                        </>
                      )}
                    />
                  ))}
                </List.Accordion>
              </List.Section>
              <Divider />
            </React.Fragment>
          );
        })}
      </ScrollView>
      <View>
        <FAB
          size="large"
          icon="download"
          label="Download report"
          style={styles.fab}
          onPress={downloadReport}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 20,
    top: 10,
  },
  surface: {
    padding: 8,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 16,
  },
});
