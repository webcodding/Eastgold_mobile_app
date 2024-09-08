import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const BarChartComponent = ({ data, ylabel, width, spacing }) => {
  return (
    <LinearGradient
      colors={["#2d2e2e", "#191a1a", "#000000"]}
      style={styles.container}
      start={{ x: 0.6, y: 0.4 }}
      end={{ x: 0.2, y: 1.8 }}
    >
      <View>
        <BarChart
          barWidth={8}
          noOfSections={7}
          barBorderRadius={4}
          frontColor="#c29555"
          isAnimated
          animationDuration={1200}
          data={data}
          showLine
          lineData={data}
          lineConfig={{
            color: "#8f8e8c",
            thickness: 3,
            curved: true,
            hideDataPoints: true,
            shiftY: 27,
            shiftX: 3,
          }}
          spacing={spacing}
          //yAxisThickness={1}
          xAxisThickness={1}
          xAxisType={"solid"}
          xAxisColor={"lightgray"}
          width={width}
          xAxisLabelTextStyle={{
            color: "#c29555",
            fontFamily: "Poppins_Bold",
            fontSize: 10,
          }}
          yAxisTextStyle={{
            color: "#c29555",
            fontFamily: "Poppins_Bold",
            marginRight: 2,
            fontSize: 10,
          }}
          rulesColor={"gray"}
          stepValue={500}
          sideWidth={10}
          isThreeD
          side="right"
          yAxisLabelSuffix={ylabel}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 20,
    height: 300,
    alignItems: "center",
    flexDirection: "row",
  },
  chart: {
    color: "#fff",
  },
});

export default BarChartComponent;
