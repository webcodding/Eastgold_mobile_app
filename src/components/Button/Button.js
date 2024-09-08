//import liraries
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// create a component
const Button = ({ text, style, onclick }) => {
  return (
    <TouchableOpacity style={styles.borderContainer} onPress={onclick}>
      <LinearGradient
        colors={["#7a5c01", "#d49d1e", "#a17903"]}
        style={styles.btnContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.3, y: 0.5 }}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: "#c29555",
    borderRadius: 5,
    marginTop: 40,
    marginHorizontal: 40,
  },
  btnContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default Button;
