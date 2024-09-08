import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";

const StatusAlert = ({ text, style, setShowAlert, status }) => {
  return (
    <View style={styles.container}>
      {status && status === "ok" ? (
        <FontAwesome5
          name="check-circle"
          size={40}
          color="green"
          style={{ marginBottom: 5 }}
        />
      ) : status && status === "error" ? (
        <Fontisto name="close" size={40} color="red" />
      ) : null}

      <Text style={[golbalStyle.normalText, style && style]}>{text}</Text>
      <TouchableOpacity style={styles.button} onPress={setShowAlert}>
        <Text style={[golbalStyle.normalText]}>close</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  },
});

export default StatusAlert;
