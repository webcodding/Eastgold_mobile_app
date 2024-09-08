import { AntDesign } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { golbalStyle } from "../../GlobalStyles";

const ChatIcon = () => {
  const [showmodal, setShowmodal] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setShowmodal((prevOpen) => !prevOpen)}>
        <AntDesign
          name="message1"
          size={26}
          color="#c29555"
          style={{ marginRight: 20, marginTop: -25, opacity: 0.9 }}
        />
      </TouchableOpacity>
      {showmodal && (
        <TouchableOpacity
          style={styles.modal}
          onPress={() => setShowmodal((prevOpen) => !prevOpen)}
        >
          <Text>Chat coming soon</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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

export default ChatIcon;
