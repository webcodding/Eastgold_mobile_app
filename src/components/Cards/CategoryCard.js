import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { golbalStyle } from "../../GlobalStyles";

const CategoryCard = ({ categories, navigation, navigationUrl, data }) => {
  const [shuffledCategories, setShuffledCategories] = useState([]);

  const shuffled = categories.sort(() => Math.random() - 0.5);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.categoryMainContainer}
    >
      {shuffled.map((item, index) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: "column",
              width: 90,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 5,
            }}
            key={index}
            onPress={() =>
              navigation.navigate(navigationUrl, {
                branchData: data,
              })
            }
          >
            <View style={styles.catCard}>
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={styles.topArrowContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.3, y: 0.5 }}
              >
                <Image src={item.image.url} style={styles.img} />
              </LinearGradient>
            </View>
            <View>
              <Text style={[golbalStyle.normalText, styles.catText]}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  catCard: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 50,
    // marginRight: 15,
    marginTop: 5,
    borderRadius: 50,
  },
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 3,
  },
  img: {
    width: 40,
    height: 40,
    objectFit: "contain",
    borderRadius: 50,
    // marginTop: 5,
  },
  background: {
    height: 41,
    flexDirection: "row",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  catText: {
    marginLeft: 10,
    marginTop: 5,
    // width: 60,
    fontSize: 10,
    opacity: 0.8,
    marginLeft: -2,
  },
});

export default CategoryCard;
