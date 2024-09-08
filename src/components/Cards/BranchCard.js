//import liraries
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import { allPartnersOffers } from "../../demo-data";
import LayoutWrapper from "../LayoutWrapper";

const BranchCard = ({
  item,
  navigation,
  partners,
  waiters,
  categories,
  managers,
  token,
  profile,
}) => {
  const matchedPartner = partners.filter(
    (partner) => partner.id === parseInt(item.partner_id)
  );
  const matchedCategory = categories.filter(
    (category) =>
      category.id === parseInt(matchedPartner[0].partner_category_id)
  );
  const matchedWaiter = waiters.filter(
    (waiter) => item.id === parseInt(waiter.branch_id)
  );
  const matchedManagers = managers.filter(
    (man) => item.general_manager === man.manager_name
  );

  // console.log(matchedManagers[0]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("BranchDetail", {
          branch: item,
          partner: matchedPartner[0],
          category: matchedCategory[0],
          waiter: matchedWaiter.length > 0 ? matchedWaiter : [],
          manager: matchedManagers.length > 0 ? matchedManagers : [],
          token: token,
          profile: profile,
        })
      }
    >
      <LinearGradient
        colors={["#2a2a2b", "#191a1a"]}
        style={[styles.branchCard]}
        start={{ x: 0.6, y: 0.4 }}
        end={{ x: 0.2, y: 1.8 }}
      >
        <View style={[golbalStyle.column]}>
          <Text style={[golbalStyle.normalText, styles.name]}>
            {item.branch_name}
          </Text>
          <Text style={[golbalStyle.normalText, styles.number]}>
            {item.location}
          </Text>
          <View style={[golbalStyle.row]}>
            <Text style={[golbalStyle.normalText, styles.discount]}>
              {item.branch_discount}%{" "}
            </Text>
            <Text style={[golbalStyle.normalText]}> Discount!</Text>
          </View>
          {/* -- show matched partner image */}
          {partners.map((partner) => {
            if (partner.id == item.partner_id) {
              return (
                <Image
                  src={partner.logo.url} // Assuming image is stored as a URI
                  style={styles.partnerImage}
                  key={partner.id}
                />
              );
            }
            return null;
          })}
        </View>
        <Image src={item.image.url} style={styles.image} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  branchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    // paddingVertical: 10,
    height: 120,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#383838",
    borderRadius: 4,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    elevation: 20,
  },
  name: {
    color: "#c29555",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  number: {
    opacity: 0.8,
    fontSize: 13,
  },
  discount: {
    color: "#c29555",
    fontFamily: "Poppins_Bold",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  partnerImage: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
});

export default BranchCard;
