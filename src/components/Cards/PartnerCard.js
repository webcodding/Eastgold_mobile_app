import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { golbalStyle } from "../../GlobalStyles";
import { allPartners, allPartnersOffers } from "../../demo-data";
import { getCategories } from "../../apiService";

const PartnerCard = ({
  navigation,
  item,
  style,
  extraStyle,
  imgStyle,
  token,
  profile,
}) => {
  const partnerDefaultImage = allPartnersOffers[1].brand_logo;
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData] = await Promise.all([getCategories(token)]);
        setCategory(categoriesData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const matchedCategory = category.filter(
    (category) => category.id === parseInt(item.partner_category_id)
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PartnerDetail", {
          partner: item,
          category: matchedCategory[0],
          token: token,
          profile: profile,
        })
      }
    >
      <LinearGradient
        style={[styles.partnerBox, style && style]}
        colors={["#2d2e2e", "#191a1a", "#000000"]}
        start={{ x: 0.6, y: 0.4 }}
        end={{ x: 0.2, y: 1.8 }}
      >
        <View style={[golbalStyle.column, { marginHorizontal: 10 }]}>
          <Text style={[golbalStyle.normalText, styles.partnerName]}>
            {item.resturent_name}
          </Text>
          <Text style={[golbalStyle.normalText, styles.partnerlocation]}>
            {item.resturent_location}
          </Text>
          <LinearGradient
            colors={["#ff7e61", "#fa4219", "#d12802"]}
            style={[
              golbalStyle.row,
              {
                padding: 10,
                paddingVertical: 2,
                borderRadius: 20,
                marginVertical: 5,
              },
            ]}
            start={{ x: 0.9, y: 0.1 }}
            end={{ x: 0.1, y: 1.3 }}
          >
            <Text style={[golbalStyle.normalText, styles.partnerCommition]}>
              {item.partner_commotion}%{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                {
                  color: "#333",
                  fontSize: 13,
                  fontFamily: "Poppins_Bold",
                },
              ]}
            >
              commotion
            </Text>
          </LinearGradient>
          <View
            style={[
              golbalStyle.row,
              {
                marginTop: 5,
              },
            ]}
          >
            {item.is_active == 0 ? (
              <>
                <Entypo
                  name="circle-with-cross"
                  size={19}
                  color="grey"
                  style={{ marginTop: -5 }}
                />
                <Text style={[golbalStyle.normalText, styles.active]}>
                  {" "}
                  Active: 0
                </Text>
              </>
            ) : (
              <>
                <FontAwesome
                  name="check-circle"
                  size={17}
                  color="green"
                  style={{ marginTop: -5, marginRight: 3 }}
                />
                <Text style={[golbalStyle.normalText, styles.active]}>
                  Active
                </Text>
              </>
            )}
          </View>
        </View>

        <LinearGradient
          colors={["#2d2e2e", "#191a1a", "#242526"]}
          style={[styles.imageContainer, extraStyle && extraStyle]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.3, y: 0.5 }}
        >
          {item.logo ? (
            <Image
              src={item.logo.url || partnerDefaultImage}
              style={[styles.image, imgStyle && imgStyle]}
            />
          ) : (
            <Image
              source={partnerDefaultImage}
              style={[styles.image, imgStyle && imgStyle]}
            />
          )}
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  partnerBox: {
    width: 240,
    height: 135,
    flexDirection: "column",
    alignItems: "flex-start",
    //paddingHorizontal: 20,
    //paddingVertical: 20,
    justifyContent: "space-between",
    borderRadius: 10,
    marginRight: 15,
    flexDirection: "row",
  },
  partnerName: {
    marginTop: 10,
    // marginHorizontal: 10,
    fontSize: 15,
    color: "#c29555",
  },
  partnerlocation: {
    marginTop: 2,
    fontSize: 13,
    opacity: 0.7,
    color: "#fff",
  },
  partnerCommition: {
    fontSize: 14,

    color: "#ffee03",
    fontFamily: "Poppins_Bold",
    marginHorizontal: 0,
  },
  imageContainer: {
    width: 90,
    height: 135,
    borderTopLeftRadius: 80,
    borderBottomLeftRadius: 80,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#363636",
    padding: 4,
    borderRightWidth: 0,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 10,
  },
  active: {
    opacity: 0.8,
    fontSize: 12,
  },
});

export default PartnerCard;
