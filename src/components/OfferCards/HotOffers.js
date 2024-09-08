import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
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
import { FontAwesome5, Fontisto, Ionicons } from "@expo/vector-icons";

const HotOffers = ({
  hotOffers,
  navigation,
  partners,
  waiters,
  categories,
  token,
  profile,
}) => {
  const sortedHotOffers = hotOffers.sort(
    (a, b) => parseFloat(b.discount) - parseFloat(a.discount)
  );
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.categoryMainContainer}
    >
      {sortedHotOffers.map((offer, index) => {
        return (
          <TouchableOpacity
            style={styles.catCard}
            key={index}
            onPress={() =>
              navigation.navigate("HotOfferDetail", {
                hotOffer: offer,
                waiters: waiters,
                partners: partners,
                categories: categories,
                token: token,
                profile: profile,
              })
            }
          >
            <Image src={offer.offer_image.url} style={styles.img} />
            <LinearGradient
              colors={["#ff7e61", "#fa4219", "#d12802"]}
              style={styles.logoContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.3, y: 0.5 }}
            >
              <View style={golbalStyle.row}>
                <FontAwesome5 name="coins" size={15} color="#ffee03" />
                <Text style={[styles.normalText, { marginTop: 5 }]}>
                  {offer.gold_offer}gm
                </Text>
              </View>
              <View style={golbalStyle.row}>
                <Ionicons name="gift" size={15} color="#ffee03" />
                <Text style={[styles.normalText, { marginTop: 5 }]}>
                  {offer.discount}%
                </Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={["#ff7e61", "#fa4219", "#d12802"]}
              style={styles.background}
              start={{ x: 0.9, y: 0.1 }}
              end={{ x: 0.1, y: 1.3 }}
            >
              <Text
                style={[styles.normalText, { fontSize: 16, marginBottom: 2 }]}
              >
                {offer.offer_name}
              </Text>
            </LinearGradient>
            <View
              style={[
                golbalStyle.row,
                { marginTop: 140, position: "absolute", right: 10 },
              ]}
            >
              {/* {offer.branches.map((item, index) => (
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#242526"]}
                  style={styles.imgCont}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.3, y: 0.5 }}
                  key={index}
                >
                  <Image
                    key={index}
                    src={item.image.url}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 50,
                    }}
                  />
                </LinearGradient>
              ))} */}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  catCard: {
    height: 180,
    width: 278,
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 10,
    marginRight: 20,
    marginVertical: 10,
    //backgroundColor: '#fff',
    //justifyContent: "center",
    //alignItems: "center",
  },
  categoryMainContainer: {
    //height: 160,
    marginBottom: 20,
    //marginHorizontal: 10,
  },
  img: {
    width: 274,
    height: 175,
    objectFit: "cover",
    borderRadius: 8,
    // marginTop: -18,
    position: "absolute",
  },
  background: {
    //width: 160,
    //height: 42,
    // backgroundColor: "#a17703",
    //flexDirection: "row",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingleft: 28,
    right: 0,
    position: "absolute",
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    // marginTop: 4,
  },
  imgConatiner: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 4,
  },
  catText: {
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.5,
  },
  normalText: {
    color: "#ffee03",
    fontSize: 14,
    fontFamily: "Poppins_Bold",
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
  imgCont: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    flexDirection: "row",
    marginHorizontal: 3,
  },
});

export default HotOffers;
