import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SearchIcon = ({ navigateUrl, navigation, data }) => {
  return (
    <TouchableOpacity
      style={styles.searchCont}
      onPress={() =>
        navigation.navigate(navigateUrl, {
          branchData: data,
        })
      }
    >
      <LinearGradient
        colors={["#2d2e2e", "#191a1a", "#242526"]}
        style={styles.topArrowContainer}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1.3, y: 1.8 }}
      >
        <AntDesign
          name="search1"
          size={18}
          color="#fff"
          style={styles.searchIcon}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 35,
    height: 35,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    opacity: 0.4,
  },
  searchCont: {
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    borderRadius: 50,
  },
});

export default SearchIcon;
