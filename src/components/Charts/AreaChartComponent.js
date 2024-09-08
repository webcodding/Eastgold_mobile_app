import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const AreaChartComponent = ({ barData, width, spacing }) => {
  return (
    <LinearGradient
      colors={["#2d2e2e", "#191a1a", "#000000"]}
      style={styles.container}
      start={{ x: 0.6, y: 0.4 }}
      end={{ x: 0.2, y: 1.8 }}
    >
      <View>
        <LineChart
          areaChart
          curved
          //hideDataPoints

          noOfSections={7}
          dataPointsWidth={40}
          dataPointsHeight={40}
          dataPointsColor="#fff"
          isAnimated
          animationDuration={1200}
          scrollAnimation
          data={barData}
          startFillColor="#c29555"
          startOpacity={0.8}
          endFillColor="#000000"
          endOpacity={0.3}
          width={width}
          color="#c29555"
          rulesColor="gray"
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
          spacing={spacing}
          stepValue={1000}
          yAxisLabelPrefix="$"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 30,
    height: 300,
    alignItems: "center",
    flexDirection: "row",
  },
  chart: {
    color: "#fff",
  },
  pointLabel: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#383838",
  },
});

export default AreaChartComponent;
