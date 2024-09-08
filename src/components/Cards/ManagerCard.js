import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { golbalStyle } from "../../GlobalStyles";
import GoldCoin from "../../../assets/3.png";

const ManagerCard = ({ item, branches, navigation, token, profile }) => {
  const matchedBranches = branches.filter(
    (branch) => branch.id === parseInt(item.branch_id)
  );
  return (
    <TouchableOpacity
      style={[golbalStyle.column, styles.waiterBox]}
      onPress={() =>
        navigation.navigate("ManagerDetail", {
          manager: item,
          branch: matchedBranches.length > 0 ? matchedBranches[0] : [],
          token: token,
          profile: profile,
        })
      }
    >
      <Image src={item.image.url} style={styles.image} />
      <Text style={[golbalStyle.normalText, styles.name]}>
        {item.manager_name}
      </Text>
      {item.is_active == 1 ? <View style={styles.activeView}></View> : null}
      <LinearGradient
        style={styles.boxContainer}
        colors={["#2d2e2e", "#191a1a", "#000000"]}
        start={{ x: 0.6, y: 0.4 }}
        end={{ x: 0.2, y: 1.8 }}
      >
        {matchedBranches.length > 0 ? (
          matchedBranches.map((branch) => (
            <Text
              key={branch.id}
              style={[golbalStyle.normalText, styles.branchName]}
            >
              {branch.branch_name}
            </Text>
          ))
        ) : (
          <Text style={[golbalStyle.normalText, styles.branchName]}>
            No Branch
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  waiterBox: {
    width: 150,
    height: 100,
    borderWidth: 1,
    borderColor: "#363636",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    marginRight: 20,
  },
  image: {
    width: 70,
    height: 70,
    position: "absolute",
    top: -30,
    borderRadius: 50,
  },
  boxContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  active: {
    opacity: 0.8,
    fontSize: 12,
  },
  name: {
    opacity: 0.6,
    fontSize: 10,
    marginTop: 5,
  },
  activeView: {
    position: "absolute",
    top: 18,
    right: 36,
    backgroundColor: "green",
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  branchName: {
    fontSize: 10,
    color: "#c29555",
  },
});

export default ManagerCard;
