import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const UserLocationIcon = () => {
  const [showmodal, setShowmodal] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={[golbalStyle.row]}
        onPress={() => setShowmodal((prevOpen) => !prevOpen)}
      >
        <MaterialIcons name="my-location" size={24} color="#c29555" />
        <Text
          style={[
            golbalStyle.normalText,
            { marginHorizontal: 7, color: "#c29555" },
          ]}
        >
          Your Current Location
        </Text>
        <Feather name="chevron-down" size={20} color="#c29555" />
      </TouchableOpacity>
      {showmodal && (
        <TouchableOpacity
          style={styles.modal}
          onPress={() => setShowmodal((prevOpen) => !prevOpen)}
        >
          <Text>Location coming soon</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: "#fff",
    position: "absolute",
    top: 40,
    left: 5,
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserLocationIcon;
