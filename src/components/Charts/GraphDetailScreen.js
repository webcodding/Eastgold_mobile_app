import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const GrapghDetail = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View style={styles.dataItem} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.profileContent}>
            <View>
              <Image source={item.image} style={styles.image} />
              <Text style={[styles.name]}>{item.name}</Text>
            </View>

            <Text style={[styles.name, { opacity: 0.7 }]}>{item.location}</Text>

            <Text style={[styles.name, { color: "#c29555" }]}>
              {item.value}$
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:20
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 9,
  },
  name: {
    fontFamily: "Nunito_Bold",
    fontSize: 13,
    color: "#fff",
    opacity: 0.9,
    marginTop: 2,
  },
  dataItem: {
    marginVertical: 10,
  },
  label: {
    textAlign: "center",
    fontFamily: "Poppins_Medium",
    fontSize: 18,
    color: "#c29555",
    opacity: 0.7,
  },
  profileContent: {
    borderWidth: 1,
    borderColor: "#383838",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default GrapghDetail;
