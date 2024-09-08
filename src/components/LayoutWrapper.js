// LayoutWrapper.js
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LayoutWrapper = ({ children }) => {
  return (
    <LinearGradient
      colors={["#2d2e2e", "#191a1a", "#000000"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.5 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LayoutWrapper;
