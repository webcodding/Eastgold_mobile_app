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
import PrevArrowButton from "../../../components/PrevArrowButton";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

const ManagerDashboard = ({ navigation, profile }) => {
  const profileInfo = profile;
  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* ----- Top Content ------ */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification
            navigation={navigation}
            profile={profileInfo}
            navigateUrl={"Profile"}
          />
        </View>
        <Text style={style.normalText}>Home</Text>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  normalText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 300,
  },
});

export default ManagerDashboard;
