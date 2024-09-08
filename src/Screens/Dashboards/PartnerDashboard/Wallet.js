import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import ProfileNotification from "../../../components/ProfileNotification";
import PrevArrowButton from "../../../components/PrevArrowButton";

const Wallet = ({ navigation, profile }) => {
  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification navigation={navigation} profile={profile} />
        </View>
        <Text style={{ color: "#fff" }}>Wallet</Text>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Wallet;
