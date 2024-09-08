//import liraries
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { style } from "../ManagerDashboard/style";
import { AntDesign } from "@expo/vector-icons";
import ProfileNotification from "../../../components/ProfileNotification";
import AreaChartComponent from "../../../components/Charts/AreaChartComponent";
import { topCashiers, topCustomers } from "../../../demo-data";
import GrapghDetail from "../../../components/Charts/GraphDetailScreen";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

// create a component
const Performance = ({ navigation, profile }) => {
  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [cashGraph, setCashGraph] = useState(true);
  const [custGraph, setCustGraph] = useState(true);
  const [cashier, setCashier] = useState(false);
  const [customer, setCustomer] = useState(false);
  const profileInfo = profile;

  return (
    <LayoutWrapper>
      <View style={styles.container}>
        <View style={[golbalStyle.topProfileContainer, { marginRight: 20 }]}>
          <Text style={styles.headText}>Performance</Text>
          <ProfileNotification navigation={navigation} profile={profileInfo} />
        </View>
        <View style={styles.switchContent}>
          <TouchableOpacity
            onPress={() => {
              setWeekly(true);
              setMonthly(false);
              setYearly(false);
            }}
          >
            <Text style={weekly ? styles.switchActive : styles.switchText}>
              Weekly
            </Text>
          </TouchableOpacity>

          <Text style={styles.slash}>{" / "}</Text>
          <TouchableOpacity
            onPress={() => {
              setMonthly(true);
              setYearly(false);
              setWeekly(false);
            }}
          >
            <Text style={monthly ? styles.switchActive : styles.switchText}>
              Monthly
            </Text>
          </TouchableOpacity>

          <Text style={styles.slash}>{" / "}</Text>
          <TouchableOpacity
            onPress={() => {
              setMonthly(false);
              setYearly(true);
              setWeekly(false);
            }}
          >
            <Text style={yearly ? styles.switchActive : styles.switchText}>
              Yearly
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginBottom: 270 }}>
          {/*-------- Cashiers ----- */}

          {!custGraph && cashGraph ? null : (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Top Cashiers</Text>
              <TouchableOpacity
                onPress={() => setCashGraph((prevOpen) => !prevOpen)}
              >
                {cashGraph ? (
                  <Text style={styles.smtitle}>See Detail</Text>
                ) : (
                  <Text style={styles.smtitle}>See Graph</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {weekly && cashGraph && custGraph && (
            <AreaChartComponent
              barData={topCashiers.weekly}
              width={270}
              spacing={40}
            />
          )}
          {weekly && !cashGraph && <GrapghDetail data={topCashiers.weekly} />}
          {monthly && cashGraph && custGraph && (
            <AreaChartComponent
              barData={topCashiers.monthly}
              width={270}
              spacing={75}
            />
          )}
          {monthly && !cashGraph && <GrapghDetail data={topCashiers.monthly} />}
          {yearly && cashGraph && custGraph && (
            <AreaChartComponent
              barData={topCashiers.yearly}
              width={290}
              spacing={45}
            />
          )}
          {yearly && !cashGraph && <GrapghDetail data={topCashiers.yearly} />}
          {/*-------- Cashiers ----- */}

          {/*-------- Customers ----- */}
          {!cashGraph && custGraph ? null : (
            <View style={[styles.titleContainer]}>
              <Text style={styles.title}>Top Customers</Text>
              <TouchableOpacity
                onPress={() => setCustGraph((prevOpen) => !prevOpen)}
              >
                {custGraph ? (
                  <Text style={styles.smtitle}>See Detail</Text>
                ) : (
                  <Text style={styles.smtitle}>See Graph</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          {weekly && custGraph && cashGraph && (
            <AreaChartComponent
              barData={topCustomers.weekly}
              width={270}
              spacing={40}
            />
          )}
          {weekly && !custGraph && <GrapghDetail data={topCustomers.weekly} />}
          {monthly && custGraph && cashGraph && (
            <AreaChartComponent
              barData={topCustomers.monthly}
              width={270}
              spacing={75}
            />
          )}
          {monthly && !custGraph && (
            <GrapghDetail data={topCustomers.monthly} />
          )}
          {yearly && custGraph && cashGraph && (
            <AreaChartComponent
              barData={topCustomers.yearly}
              width={290}
              spacing={45}
            />
          )}
          {yearly && !custGraph && <GrapghDetail data={topCustomers.yearly} />}
          {/*-------- Customers ----- */}
        </ScrollView>
      </View>
    </LayoutWrapper>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "start",
    alignItems: "start",
    paddingLeft: 20,
  },
  normalText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 300,
  },
  headText: {
    color: "#fff",
    opacity: 0.8,
    fontFamily: "Lato_Regular",
    fontSize: 20,
    letterSpacing: 0.5,
    textShadowColor: "#000",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 20,
  },
  title: {
    fontFamily: "Poppins_Medium",
    textAlign: "left",
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
    opacity: 0.6,
  },
  smtitle: {
    fontFamily: "Poppins_Medium",
    textAlign: "right",
    fontSize: 12,
    color: "#c29555",
    marginTop: 20,
  },
  switchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingBottom: 10,
    marginRight: 20,
    marginBottom: 10,
  },
  switchText: {
    fontFamily: "Poppins_Medium",
    fontSize: 18,
    color: "#c29555",
    opacity: 0.6,
  },
  slash: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 18,
    opacity: 0.8,
  },
  switchActive: {
    fontFamily: "Poppins_Medium",
    fontSize: 18,
    color: "#c29555",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
  },
});

export default Performance;
