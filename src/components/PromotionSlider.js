import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

const PromotionSlider = ({ data }) => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        showPagination
        data={data}
        renderItem={({ item }) => (
          <View style={styles.imgContainer}>
            <Image source={item.img} style={styles.img} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  img: {
    width: 370,
    height: 200,
    objectFit: "cover",
  },
  imgContainer: {
    marginRight: 10,
  },
});

export default PromotionSlider;
