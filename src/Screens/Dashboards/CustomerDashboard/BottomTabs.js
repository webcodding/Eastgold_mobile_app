import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Ionicons,
  FontAwesome6,
  FontAwesome,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import CustomerDashboard from "./Dashboard";
import ScannerScreen from "./ScannerScreen";
import Wallet from "./Wallet";
import Transections from "./Transections";
import Offers from "./Offers";
import Profile from "../Profile";
import { logout } from "../../Login/LogoutFunction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

const Tab = createBottomTabNavigator();

const CustomerBottomTabs = ({ route, navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await AsyncStorage.getItem("user");
        if (userProfile) {
          setProfile(JSON.parse(userProfile));
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <LayoutWrapper>
        <View style={[golbalStyle.container, { marginTop: 120 }]}>
          <ActivityIndicator size="large" color="#acacad" />
        </View>
      </LayoutWrapper>
    );
  }

  const logOut = () => logout(navigation);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // flex: 1,
          position: "absolute",
          backgroundColor: "#000",
          marginHorizontal: 20,
          marginBottom: 20,
          paddingHorizontal: 10,
          paddingBottom: 0,
          height: 70,
          borderWidth: 1,
          borderColor: "#c29555",
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowColor: "transparent",
        },
        keyboardHidesTabBar: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <Ionicons
                name="earth-outline"
                size={23}
                color={focused ? "#db7c00" : "#c29555"}
              />
              {/* <Entypo
                name="home"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              /> */}
              <Text style={focused ? styles.tabLabel : styles.label}>
                Discover
              </Text>
            </View>
          ),
        }}
      >
        {() => <CustomerDashboard navigation={navigation} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen
        name="Branches"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <MaterialCommunityIcons
                name="wallet-giftcard"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />

              <Text style={focused ? styles.tabLabel : styles.label}>
                Offers
              </Text>
            </View>
          ),
        }}
      >
        {() => <Offers navigation={navigation} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen
        name="Scanner"
        //  component={QrGenerateScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="scan1"
              size={36}
              color="black"
              style={focused ? styles.activeQr : styles.qrIcon}
            />
          ),
        }}
      >
        {() => <ScannerScreen navigation={navigation} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome5
                name="user"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? [styles.tabLabel] : [styles.label]}>
                Profile
              </Text>
            </View>
          ),
        }}
      >
        {() => (
          <Profile navigation={navigation} profile={profile} logout={logOut} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Wallet"
        //component={WalletScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <Entypo
                name="wallet"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>
                Wallet
              </Text>
            </View>
          ),
        }}
      >
        {() => <Wallet navigation={navigation} profile={profile} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  qrIcon: {
    backgroundColor: "#c29555",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    top: -30,
  },
  tabIcon: {
    marginTop: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  activeQr: {
    backgroundColor: "#db7c00",
    padding: 16,
    borderRadius: 50,
    position: "absolute",
    top: -30,
  },
  tabLabel: {
    fontFamily: "Poppins_Medium",
    marginTop: 0,
    paddingBottom: 2,
    color: "#db7c00",
    borderBottomWidth: 1,
    borderBottomColor: "#c29555",
    marginBottom: -8,
    fontSize: 8,
  },
  label: {
    fontFamily: "Poppins_Medium",
    marginTop: 0,
    paddingBottom: 2,
    color: "#c29555",
    marginBottom: -8,
    fontSize: 8,
  },
});

export default CustomerBottomTabs;
