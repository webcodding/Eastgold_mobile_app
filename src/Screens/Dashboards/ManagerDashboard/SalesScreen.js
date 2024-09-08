import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import {
  AntDesign,
  FontAwesome,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProfileNotification from "../../../components/ProfileNotification";
import BarChartComponent from "../../../components/Charts/BarChartComponent";
import { ScrollView } from "react-native-gesture-handler";
import {
  goldSale,
  sales,
  targetGoldSales,
  targetSales,
} from "../../../demo-data";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

const SalesScreen = ({ navigation, profile }) => {
  const profileInfo = profile;
  const colors = ["#FFD700", "#000000"];

  const [selectGold, setSelectGold] = useState(false);

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
  };

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        <View style={golbalStyle.topProfileContainer}>
          <Text style={styles.headText}>Sales</Text>
          <ProfileNotification navigation={navigation} profile={profileInfo} />
        </View>

        <ScrollView style={{ marginBottom: 100 }}>
          {/* ----------- Week Title ------- */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>This week</Text>
            {selectGold ? (
              <TouchableOpacity
                style={styles.rightContainer}
                onPress={() => setSelectGold((prevOpen) => !prevOpen)}
              >
                <MaterialCommunityIcons
                  name="gold"
                  size={24}
                  color="#c29555"
                  style={styles.goldIcon}
                />
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={32}
                  color="#a6a5a2"
                  style={{ marginHorizontal: -5 }}
                />
                <Foundation
                  name="dollar"
                  size={30}
                  color="#c29555"
                  style={{ opacity: 0.5 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.rightContainer}
                onPress={() => setSelectGold((prevOpen) => !prevOpen)}
              >
                <Foundation name="dollar" size={30} color="#c29555" />
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={32}
                  color="#a6a5a2"
                  style={{ marginHorizontal: -5 }}
                />
                <MaterialCommunityIcons
                  name="gold"
                  size={24}
                  color="#c29555"
                  style={[styles.goldIcon, { opacity: 0.5 }]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.targetContainer}>
            <Text style={styles.targetTitle}>{"(Target: "}</Text>
            <Text style={styles.target}>
              {selectGold
                ? `${targetGoldSales.weekly}g`
                : `${targetSales.weekly}$`}
            </Text>
            <Text style={styles.targetTitle}>{"/"}</Text>
            <Text style={styles.targetTitle}>
              {selectGold ? "Gold Sale:" : "Sales:"}
            </Text>
            <Text style={styles.subtitle}>
              {selectGold
                ? calculatePercentage(
                    goldSale.weekly.reduce((acc, cur) => acc + cur.value, 0),
                    targetGoldSales.weekly
                  )
                : calculatePercentage(
                    sales.weekly.reduce((acc, cur) => acc + cur.value, 0),
                    targetSales.weekly
                  )}
              %
            </Text>
            <Text style={styles.targetTitle}>{")"}</Text>
          </View>

          {/* Gold icon or Dollar icon */}
          {selectGold ? (
            <BarChartComponent
              data={goldSale.weekly}
              ylabel={"g"}
              width={270}
              spacing={30}
            />
          ) : (
            <BarChartComponent
              data={sales.weekly}
              ylabel={"$"}
              width={270}
              spacing={30}
            />
          )}

          {/* -----------Month Title ------- */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>This Month</Text>
            {selectGold ? (
              <TouchableOpacity
                style={styles.rightContainer}
                onPress={() => setSelectGold((prevOpen) => !prevOpen)}
              >
                <MaterialCommunityIcons
                  name="gold"
                  size={24}
                  color="#c29555"
                  style={styles.goldIcon}
                />
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={32}
                  color="#a6a5a2"
                  style={{ marginHorizontal: -5 }}
                />
                <Foundation
                  name="dollar"
                  size={30}
                  color="#c29555"
                  style={{ opacity: 0.5 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.rightContainer}
                onPress={() => setSelectGold((prevOpen) => !prevOpen)}
              >
                <Foundation name="dollar" size={30} color="#c29555" />
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={32}
                  color="#a6a5a2"
                  style={{ marginHorizontal: -5 }}
                />
                <MaterialCommunityIcons
                  name="gold"
                  size={24}
                  color="#c29555"
                  style={[styles.goldIcon, { opacity: 0.5 }]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.targetContainer}>
            <Text style={styles.targetTitle}>{"(Target: "}</Text>
            <Text style={styles.target}>
              {selectGold
                ? `${targetGoldSales.monthly}g`
                : `${targetSales.monthly}$`}
            </Text>
            <Text style={styles.targetTitle}>{"/"}</Text>
            <Text style={styles.targetTitle}>
              {selectGold ? "Gold Sale:" : "Sales:"}
            </Text>
            <Text style={styles.subtitle}>
              {selectGold
                ? calculatePercentage(
                    goldSale.monthly.reduce((acc, cur) => acc + cur.value, 0),
                    targetGoldSales.monthly
                  )
                : calculatePercentage(
                    sales.monthly.reduce((acc, cur) => acc + cur.value, 0),
                    targetSales.monthly
                  )}
              %
            </Text>
            <Text style={styles.targetTitle}>{")"}</Text>
          </View>

          {/* Gold icon or Dollar icon */}

          {selectGold ? (
            <BarChartComponent
              data={goldSale.monthly}
              ylabel={"g"}
              width={250}
              spacing={50}
            />
          ) : (
            <BarChartComponent
              data={sales.monthly}
              ylabel={"$"}
              width={250}
              spacing={50}
            />
          )}

          {/* ----------- Year Title ------- */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>This Year</Text>
            {selectGold ? (
              <TouchableOpacity
                style={styles.rightContainer}
                onPress={() => setSelectGold((prevOpen) => !prevOpen)}
              >
                <MaterialCommunityIcons
                  name="gold"
                  size={24}
                  color="#c29555"
                  style={styles.goldIcon}
                />
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={32}
                  color="#a6a5a2"
                  style={{ marginHorizontal: -5 }}
                />
                <Foundation
                  name="dollar"
                  size={30}
                  color="#c29555"
                  style={{ opacity: 0.5 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.rightContainer}
                onPress={() => setSelectGold((prevOpen) => !prevOpen)}
              >
                <Foundation name="dollar" size={30} color="#c29555" />
                <MaterialCommunityIcons
                  name="slash-forward"
                  size={32}
                  color="#a6a5a2"
                  style={{ marginHorizontal: -5 }}
                />
                <MaterialCommunityIcons
                  name="gold"
                  size={24}
                  color="#c29555"
                  style={[styles.goldIcon, { opacity: 0.5 }]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.targetContainer}>
            <Text style={styles.targetTitle}>{"(Target: "}</Text>
            <Text style={styles.target}>
              {selectGold
                ? `${targetGoldSales.yearly}g`
                : `${targetSales.yearly}$`}
            </Text>
            <Text style={styles.targetTitle}>{"/"}</Text>
            <Text style={styles.targetTitle}>
              {selectGold ? "Gold Sale:" : "Sales:"}
            </Text>
            <Text style={styles.subtitle}>
              {selectGold
                ? calculatePercentage(
                    goldSale.yearly.reduce((acc, cur) => acc + cur.value, 0),
                    targetGoldSales.yearly
                  )
                : calculatePercentage(
                    sales.yearly.reduce((acc, cur) => acc + cur.value, 0),
                    targetSales.yearly
                  )}
              %
            </Text>
            <Text style={styles.targetTitle}>{")"}</Text>
          </View>

          {/* Gold icon or Dollar icon */}

          {selectGold ? (
            <BarChartComponent
              data={goldSale.yearly}
              ylabel={"g"}
              width={293}
              spacing={16}
            />
          ) : (
            <BarChartComponent
              data={sales.yearly}
              ylabel={"$"}
              width={293}
              spacing={16}
            />
          )}
        </ScrollView>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    paddingLeft: 20,
  },
  normalText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 300,
  },
  heading: {
    fontFamily: "Poppins_Bold",
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    marginTop: 30,
  },
  title: {
    fontFamily: "Poppins_Medium",
    textAlign: "left",
    fontSize: 18,
    color: "#fff",
    marginTop: 30,
    opacity: 0.6,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //marginRight: 20,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 60,
    justifyContent: "space-between",
    marginTop: 18,
  },
  goldIcon: {
    marginTop: -8,
  },
  targetContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    //marginRight: 25,
  },
  target: {
    color: "#c29555",
    fontFamily: "Poppins_Medium",
    fontSize: 16,
  },
  targetTitle: {
    color: "#8f8e8c",
    fontFamily: "Poppins_Medium",
    fontSize: 16,
  },
  subtitle: {
    color: "#c29555",
    fontFamily: "Poppins_Medium",
    fontSize: 16,
  },
  headText: {
    color: "#fff",
    opacity: 0.8,
    fontFamily: "Lato_Regular",
    fontSize: 26,
    letterSpacing: 0.5,
    textShadowColor: "#000",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 20,
  },
});

export default SalesScreen;
