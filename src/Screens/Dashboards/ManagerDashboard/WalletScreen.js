//import liraries
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { style } from "./style";
import ProfileNotification from "../../../components/ProfileNotification";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";

// create a component
const ManagerWalletScreen = ({ navigation, profile }) => {
  const profileInfo = profile;
  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification navigation={navigation} profile={profileInfo} />
        </View>
        <Text style={style.normalText}>Wallet</Text>
      </View>
    </LayoutWrapper>
  );
};

// define your styles
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
});

//make this component available to the app
export default ManagerWalletScreen;
