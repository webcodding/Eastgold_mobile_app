//import liraries
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// create a component
const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.searchMainContainer}>
      <LinearGradient
        colors={["#191a1a", "#000000"]}
        style={styles.searchContainer}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 0, y: 0 }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#4b4b4d"}
          style={styles.inputText}
          value={value}
          onChangeText={onChangeText}
        />
        <Feather
          name="search"
          size={22}
          color="#4b4b4d"
          style={styles.searchIcon}
        />
      </LinearGradient>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  searchMainContainer: {
    height: 54,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 0.7,
    borderColor: "#383838",
    shadowColor: "#4e4d4f",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 14,
  },
  inputText: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
    width: "90%",
    opacity: 0.7,
  },
  searchIcon: {
    marginLeft: -20,
  },
});

export default SearchBar;
