import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Ionicons,
  FontAwesome6,
  FontAwesome,
  Octicons,
  FontAwesome5,
} from "@expo/vector-icons";
import PartnerDashboard from "./Dashboard";
import Sales from "./Sales";
import Performance from "./Performance";
import Wallet from "./Wallet";
import Profile from "../Profile";
import { logout } from "../../Login/LogoutFunction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

const Tab = createBottomTabNavigator();

const PartnerBottomTabs = ({ route, navigation }) => {
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
        name="Branches"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome6
                name="code-branch"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>
                Branches
              </Text>
            </View>
          ),
        }}
      >
        {() => (
          <PartnerDashboard
            navigation={navigation}
            profile={profile}
            logout={logOut}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Sales"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome6
                name="money-bill-1-wave"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>
                Sales
              </Text>
            </View>
          ),
        }}
      >
        {() => <Sales navigation={navigation} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen
        name="Performance"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome6
                name="chart-column"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>
                Performance
              </Text>
            </View>
          ),
        }}
      >
        {() => <Performance navigation={navigation} profile={profile} />}
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
        {() => <Profile navigation={navigation} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen
        name="Wallet"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome
                name="money"
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
    padding: 20,
    borderRadius: 50,
    position: "absolute",
    top: -30,
  },
  tabLabel: {
    fontFamily: "Poppins_Medium",
    marginTop: 0,
    paddingBottom: 2,
    color: "#db7c00",
    borderBottomWidth: 3,
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

export default PartnerBottomTabs;
