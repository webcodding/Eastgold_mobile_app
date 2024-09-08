//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";

// create a component
const Alert = ({ text, style, setShowAlert }) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="exclamationcircleo"
        size={40}
        color="#04b88e"
        style={{ marginBottom: 10 }}
      />
      <Text style={[golbalStyle.normalText, style && style]}>{text}</Text>
      <TouchableOpacity style={styles.button} onPress={setShowAlert}>
        <Text style={[golbalStyle.normalText]}>close</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
    position: "absolute",
    padding: 15,
    paddingVertical: 30,
    top: "40%",
    left: "25%",
    zIndex: 80,
    height: "auto",
    width: 200,
  },
  button: {
    backgroundColor: "#363636",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 10,
  },
});

//make this component available to the app
export default Alert;
