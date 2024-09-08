import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { golbalStyle } from "../GlobalStyles";
import GoldBarImg from "../../assets/4.png";

const PromotionOfferCard = ({ offers }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.categoryMainContainer}
    >
      {offers.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <View style={styles.topcontent}>
            <View style={[golbalStyle.row, { justifyContent: "center" }]}>
              <Text style={[golbalStyle.normalText, styles.heading]}>
                Get{"  "}
              </Text>
              <Text
                style={[
                  golbalStyle.normalText,
                  styles.heading,
                  styles.highlight,
                ]}
              >
                {item.discount}
                {"  "}
              </Text>
              <Text style={[golbalStyle.normalText, styles.heading]}>
                discount
              </Text>
            </View>
            <View style={[golbalStyle.row, { justifyContent: "center" }]}>
              <Text
                style={[
                  golbalStyle.normalText,
                  styles.heading,
                  { fontSize: 14 },
                ]}
              >
                On{" "}
              </Text>
              <Text
                style={[
                  golbalStyle.normalText,
                  styles.heading,
                  styles.highlight,
                  { fontSize: 14 },
                ]}
              >
                {item.type}
              </Text>
            </View>
            <View style={[golbalStyle.row, { justifyContent: "center" }]}>
              <Text
                style={[
                  golbalStyle.normalText,
                  styles.heading,
                  { fontSize: 13 },
                ]}
              >
                Earn{" "}
              </Text>
              <Text
                style={[
                  golbalStyle.normalText,
                  styles.heading,
                  styles.highlight,
                  { fontSize: 13 },
                ]}
              >
                {item.gold_earn}{" "}
              </Text>
              <Image source={GoldBarImg} style={{ width: 30, height: 20 }} />
            </View>
            <View style={[golbalStyle.row, { justifyContent: "center" }]}>
              <Image source={item.branch.branch_img} style={styles.branchImg} />
            </View>
          </View>
          <LinearGradient
            colors={["#2d2e2e", "#191a1a", "#000000"]}
            style={styles.background}
            start={{ x: 0.6, y: 0.4 }}
            end={{ x: 0.2, y: 1.8 }}
          >
            <Text style={[golbalStyle.normalText, styles.catText]}>
              Get This Offer
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 200,
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 10,
    marginRight: 15,
    marginVertical: 20,
  },
  catText: {
    marginLeft: 10,
    marginTop: 5,
    color: "#c29555",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins_SemiBoldItalic",
  },
  background: {
    height: 51,
    flexDirection: "row",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  topcontent: {
    height: 145,
  },
  heading: {
    fontSize: 18,
    opacity: 0.6,
    textAlign: "center",
  },
  highlight: {
    color: "#c29555",
    opacity: 1,
  },
  branchImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c29555",
    marginTop: 8,
  },
});

export default PromotionOfferCard;
