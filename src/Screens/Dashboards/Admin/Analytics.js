import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";

const Analytics = ({ navigation, profile }) => {
  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification navigation={navigation} profile={profile} />
        </View>
        <Text style={{ color: "#fff" }}>Analytics</Text>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({});

export default Analytics;
