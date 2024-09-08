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
import Transections from "./Transections";
import Analytics from "./Analytics";
import Profile from "../Profile";
import AllUsers from "./AllUsers";
import AllBranches from "./AllBranches";
import { logout } from "../../Login/LogoutFunction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

const Tab = createBottomTabNavigator();

const AdminBottomTabs = ({ route, navigation }) => {
  //  const profile = route.params.profile;
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
        name="All Users"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome
                name="users"
                size={23}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>
                All Users
              </Text>
            </View>
          ),
        }}
      >
        {() => <AllUsers navigation={navigation} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen
        name="All Branches"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome6
                name="code-branch"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? [styles.tabLabel] : [styles.label]}>
                All Branches
              </Text>
            </View>
          ),
        }}
      >
        {() => <AllBranches navigation={navigation} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen
        name="Transections"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <Octicons
                name="arrow-switch"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? [styles.tabLabel] : [styles.label]}>
                Transections
              </Text>
            </View>
          ),
        }}
      >
        {() => <Transections navigation={navigation} profile={profile} />}
      </Tab.Screen>

      <Tab.Screen
        name="Analytics"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIcon}>
              <Ionicons
                name="analytics-sharp"
                size={24}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>
                Analytics
              </Text>
            </View>
          ),
        }}
      >
        {() => <Analytics navigation={navigation} profile={profile} />}
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

export default AdminBottomTabs;
