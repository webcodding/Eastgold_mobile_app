//import liraries
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// create a component
const PrevArrowButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <LinearGradient
        colors={["#2d2e2e", "#191a1a", "#242526"]}
        style={styles.topArrowContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.3, y: 0.5 }}
      >
        <AntDesign
          name="arrowleft"
          size={18}
          color="#737475"
          style={styles.topArrow}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 30,
    height: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  topArrow: {},
});

//make this component available to the app
export default PrevArrowButton;
