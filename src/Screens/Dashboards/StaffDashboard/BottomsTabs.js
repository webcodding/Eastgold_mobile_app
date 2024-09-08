import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";
import StaffDashboard from "./DashboardScreen";
import QrGenerateScreen from "./QrGenerateScreen";
import WalletScreen from "./WalletScreen";
import styles from "./styles";
import {
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import { logout } from "../../Login/LogoutFunction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

const Tab = createBottomTabNavigator();

const StaffBottomTabs = ({ route, navigation }) => {
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
          marginHorizontal: 50,
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
              <Entypo
                name="home"
                size={30}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>Home</Text>
            </View>
          ),
        }}
      >
        {() => (
          <StaffDashboard
            navigation={navigation}
            profile={profile}
            logout={logOut}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="QR"
        //  component={QrGenerateScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="qr-code-outline"
              size={36}
              color="black"
              style={focused ? styles.activeQr : styles.qrIcon}
            />
          ),
        }}
      >
        {() => <QrGenerateScreen navigation={navigation} profile={profile} />}
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
                size={30}
                color={focused ? "#db7c00" : "#c29555"}
              />
              <Text style={focused ? styles.tabLabel : styles.label}>
                Wallet
              </Text>
            </View>
          ),
        }}
      >
        {() => <WalletScreen navigation={navigation} profile={profile} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default StaffBottomTabs;
