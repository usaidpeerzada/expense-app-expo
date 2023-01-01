import React from "react";
import { Text, Title } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
export default function ReportScreen() {
  const screenWidth = Dimensions.get("window").width;
  const data = [
    {
      name: "Seoul",
      population: 215,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 28,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 5,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 85,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 119,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
    <View style={{ margin: 20 }}>
      <Title
        style={{
          marginBottom: 20,
          marginTop: 20,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Report
      </Title>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional
          propsForLabels: { padding: 110 },
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        // paddingLeft={"15"}
        // center={[10, 20]}
        absolute
      />
      <Text>Expense: $200</Text>
    </View>
  );
}
