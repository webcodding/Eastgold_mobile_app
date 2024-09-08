import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import GoldBarImg from "../../../assets/4.png";
import { Fontisto } from "@expo/vector-icons";

const SmallBranchCard = ({
  branchData,
  navigation,
  partners,
  waiters,
  categories,
  manager,
  token,
  profile,
}) => {
  const sortedBranches = branchData.sort(
    (a, b) =>
      parseFloat(b.marketing_discount) - parseFloat(a.marketing_discount)
  );
  const firstFiveBranches = sortedBranches.slice(0, 5);

  return (
    <>
      <ScrollView style={styles.categoryMainContainer}>
        {firstFiveBranches.map((branch, index) => {
          const matchedPartner = partners.filter(
            (partner) => partner.id === parseInt(branch.partner_id)
          );
          //   console.log(matchedPartner[0].partner_category_id);
          const matchedCategory = categories.filter(
            (category) =>
              category.id === parseInt(matchedPartner[0].partner_category_id)
          );
          const matchedWaiter = waiters.filter(
            (waiter) => branch.id === parseInt(waiter.branch_id)
          );
          const matchedManagers = manager.filter(
            (man) => branch.general_manager === man.manager_name
          );
          //console.log(matchedPartner[0].rating);
          return (
            <TouchableOpacity
              style={styles.catCard}
              key={index}
              onPress={() =>
                navigation.navigate("BranchDetail", {
                  branch: branch,
                  partner: matchedPartner[0],
                  category: matchedCategory[0],
                  waiter: matchedWaiter[0],
                  manager: matchedManagers[0],
                  token: token,
                  profile: profile,
                })
              }
            >
              <Image src={branch.image.url} style={styles.img} />
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={styles.logoContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.3, y: 0.5 }}
              >
                <View style={golbalStyle.row}>
                  <Fontisto name="star" size={15} color="#c29555" />
                  <Text style={[styles.normalText, { marginTop: 5 }]}>
                    {"("}
                    {matchedPartner[0].rating}
                    {")"}
                  </Text>
                </View>
                <Image
                  src={matchedPartner[0].image.url}
                  style={styles.catImg}
                />
              </LinearGradient>

              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#000000"]}
                style={styles.background}
                start={{ x: 0.6, y: 0.4 }}
                end={{ x: 0.2, y: 1.8 }}
              >
                <Text
                  style={[
                    styles.normalText,
                    { fontSize: 16, marginBottom: -5 },
                  ]}
                >
                  {branch.marketing_discount} Discount!
                </Text>
                <View style={[golbalStyle.row]}>
                  <Text style={[styles.normalText]}>
                    {branch.customer_gold_back}gm
                  </Text>
                  <Image
                    source={GoldBarImg}
                    style={{ width: 25, height: 20, marginLeft: 5 }}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[
            //styles.catCard,
            { alignItems: "center", justifyContent: "center" },
          ]}
          onPress={() => navigation.navigate("Branches")}
        >
          <LinearGradient
            colors={["#2d2e2e", "#191a1a", "#000000"]}
            style={styles.btnContainer}
            start={{ x: 0.6, y: 0.4 }}
            end={{ x: 0.2, y: 1.8 }}
          >
            <Text style={[golbalStyle.normalText]}>See All</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  catCard: {
    height: 180,
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 10,
    marginHorizontal: 35,
    marginVertical: 10,
    //justifyContent: "center",
    //alignItems: "center",
  },
  categoryMainContainer: {
    //height: 160,
    marginBottom: 20,
  },
  img: {
    width: 277,
    height: 175,
    objectFit: "cover",
    borderRadius: 8,
    // marginTop: -18,
    position: "absolute",
  },
  background: {
    width: 160,
    height: 42,
    backgroundColor: "#a17703",
    //flexDirection: "row",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingleft: 8,
    right: 0,
    position: "absolute",
  },

  btnContainer: {
    width: 150,
    height: 40,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 25,
    height: 25,
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
  catImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginTop: 4,
  },
  catText: {
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.5,
  },
  normalText: {
    color: "#c29555",
    fontSize: 14,
    fontFamily: "Poppins_Regular",
    lineHeight: 22,
  },
  logoContainer: {
    //backgroundColor: "#db7c00",
    width: 80,
    height: 70,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 8,
    alignItems: "center",
  },
});

export default SmallBranchCard;
