import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { golbalStyle } from "../../GlobalStyles";

const BranchCard = ({ branchData, navigation }) => {
  return (
    <View style={styles.cardContainer}>
      <FlatList
        data={branchData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BranchDetail", { branch: item })
            }
          >
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#000000"]}
              style={styles.cards}
              start={{ x: 0.6, y: 0.4 }}
              end={{ x: 0.2, y: 1.8 }}
            >
              <View style={styles.leftContent}>
                <Text
                  style={[
                    golbalStyle.normalText,
                    {
                      color: "#c29555",
                      fontSize: 16,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  {item.branch_name}
                </Text>
                <Text style={[golbalStyle.normalText, { opacity: 0.7 }]}>
                  {item.location}
                </Text>
                <View
                  style={[
                    golbalStyle.row,
                    { marginLeft: -5, marginVertical: 5 },
                  ]}
                >
                  <LinearGradient
                    colors={["#2d2e2e", "#191a1a", "#242526"]}
                    style={styles.topArrowContainer}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1.3, y: 1.8 }}
                  >
                    <Image source={item.category_img} style={styles.catImg} />
                  </LinearGradient>
                  <Text style={[golbalStyle.normalText, styles.catText]}>
                    {item.category}
                  </Text>
                </View>
                <View style={[golbalStyle.row]}>
                  <Text style={styles.discount}>{item.discount}</Text>
                  <Text style={[styles.discount, { color: "#fff" }]}>
                    {" "}
                    Discount!
                  </Text>
                </View>
                {/* ---- Small all admin, cashier and customer profile image ----- */}
                {/* <RenderSmallProfiles
                  manager={item.manager}
                  cashiers={item.cashier}
                  customers={item.customer}
                /> */}
                {/* ------------ */}
              </View>

              <View
                style={[golbalStyle.column, { justifyContent: "flex-end" }]}
              >
                <Image source={item.branch_img} style={styles.img} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    //marginBottom: 280,
  },
  cards: {
    height: 145,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
    borderRadius: 10,
    marginVertical: 15,
  },
  leftContent: {
    flexDirection: "column",
  },
  img: {
    width: 85,
    height: 90,
    objectFit: "cover",
    borderRadius: 5,
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
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  catText: {
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.5,
  },
  discount: {
    color: "#c29555",
    fontFamily: "Nunito_Regular",
    fontSize: 18,
    opacity: 0.9,
  },
});

export default BranchCard;
