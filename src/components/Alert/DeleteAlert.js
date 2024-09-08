import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";

const DeleteAlert = ({ text, style, setShowAlert, deleteFunction }) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="delete"
        size={40}
        color="#acacad"
        style={{ marginBottom: 10 }}
      />
      <Text style={[golbalStyle.normalText, style && style]}>{text}</Text>
      <View style={[golbalStyle.row]}>
        <TouchableOpacity style={styles.button} onPress={setShowAlert}>
          <Text style={[golbalStyle.normalText]}>close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteFunction}>
          <Text style={[golbalStyle.normalText, { color: "red" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 10,
    marginHorizontal: 5,
  },
});

export default DeleteAlert;
