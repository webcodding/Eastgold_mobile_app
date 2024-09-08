import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import { Image } from "react-native";
import Rating from "../../components/Rating";
import DeleteAlert from "../../components/Alert/DeleteAlert";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import StatusAlert from "../../components/Alert/StatusAlert";
import { deletePartner } from "../../apiService";

const PartnerDetailScreen = ({ navigation, route }) => {
  const partner = route.params.partner;
  const category = route.params.category;
  const token = route.params.token;
  const profile = route.params.profile;
  const [showdltAlert, setShowDltAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleDeletePartner = async () => {
    try {
      const response = await deletePartner(partner.id, token);

      if (response.ok) {
        setStatusAlert(true);
        setShowDltAlert(false);
        navigation.goBack();
      } else {
        // Handle error cases
        const errorData = await response.json();
        console.log(
          "Error",
          errorData.message || "An error occurred while deleting the branch."
        );
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };
  return (
    <LayoutWrapper>
      {/* ----- Top content ---- */}
      <View style={[golbalStyle.row]}>
        <View style={styles.topContainer}>
          <PrevArrowButton />
          <View style={[golbalStyle.row, { marginRight: 20 }]}>
            {profile.user_type === "admin" ? (
              <>
                <EditIcon
                  navigateUrl={"EditPartner"}
                  navigation={navigation}
                  data={{ partner: partner, category: category, token: token }}
                />
                <DeleteIcon dltFunction={() => setShowDltAlert(true)} />
              </>
            ) : null}
          </View>
        </View>
      </View>
      {/* ------ */}
      {/* Main content */}
      <View style={[golbalStyle.container, styles.container]}>
        {/* logo */}
        <Image src={partner.logo.url} style={[golbalStyle.image, styles.img]} />
        {/* name */}
        <Text style={[styles.text, styles.branchName]}>
          {" "}
          {partner.resturent_name}
        </Text>

        {/* desc and rating */}
        <Text style={[golbalStyle.normalText, styles.desc]}>
          {partner.desc?.replace(/<(?:.|\n)*?>/gm, "")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Rating rating={partner.rating} size={16} />
          <Text style={[styles.text]}>
            {"("}
            {partner.rating}
            {")"}
          </Text>
        </View>
        {/* boxes */}
        <View style={[golbalStyle.row, { justifyContent: "center" }]}>
          <View style={[golbalStyle.row, styles.box]}>
            <Entypo
              name="clock"
              size={18}
              color="#c29555"
              style={{ marginTop: -3, marginRight: 2 }}
            />
            <Text style={[styles.text, styles.value]}>
              {" "}
              {partner.work_time || "Null"}
            </Text>
          </View>
        </View>
        <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
          <View>
            {/* Commotion */}
            <View style={[golbalStyle.row, styles.box]}>
              <MaterialCommunityIcons
                name="hand-coin-outline"
                size={24}
                color="#c29555"
              />
              <Text style={[styles.text, styles.value]}>
                {" "}
                {partner.partner_commotion}% Commition
              </Text>
            </View>
            {/* category */}
            <View style={[golbalStyle.row, styles.box]}>
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={styles.topArrowContainer}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1.3, y: 1.8 }}
              >
                <Image
                  source={{ uri: category.image.url }}
                  style={styles.catImg}
                />
              </LinearGradient>
              <Text style={[golbalStyle.normalText, styles.text, styles.value]}>
                {category.name}
              </Text>
            </View>
          </View>
          <View>
            {/* website */}
            <View style={[golbalStyle.row, styles.box]}>
              <AntDesign
                name="earth"
                size={18}
                color="#c29555"
                style={{ marginRight: 5 }}
              />

              <Text style={[styles.text, styles.value, { fontSize: 9 }]}>
                {partner.website ? partner.website : "null"}
              </Text>
            </View>
            {/* active */}
            <View style={[golbalStyle.row, styles.box]}>
              {partner.is_active == 1 ? (
                <Fontisto name="radio-btn-active" size={12} color="green" />
              ) : (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={14}
                  color="#363636"
                />
              )}
              <Text style={[styles.text, styles.value]}>
                {" "}
                {partner.is_active == 1 ? "Active" : "Not Active"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* -------- */}
      {showdltAlert && (
        <DeleteAlert
          text={"You want to delete this Partner?"}
          setShowAlert={() => setShowDltAlert(false)}
          deleteFunction={handleDeletePartner}
        />
      )}
      {statusAlert && (
        <StatusAlert
          status={"ok"}
          text={"Successfully Deleted!"}
          setShowAlert={() => setStatusAlert(false)}
          style={{ marginVertical: 10 }}
        />
      )}
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    top: 40,
    left: 10,
    position: "absolute",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    marginTop: 100,
    flexDirection: "column",
  },
  img: {
    alignSelf: "center",
    borderRadius: 10,
  },
  topArrowContainer: {
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
    marginHorizontal: 5,
  },
  catImg: {
    width: 22,
    height: 22,
    borderRadius: 50,
  },
  catText: {
    marginLeft: 3,
    fontSize: 12,
    opacity: 0.5,
  },
  managerImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    objectFit: "cover",
  },
  heading: {
    textAlign: "center",
    fontSize: 17,
    opacity: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: "#c29555",
    width: "50%",
    fontFamily: "Poppins_Medium",
    marginTop: 15,
  },
  title: {
    fontSize: 14,
    opacity: 0.8,
    color: "#c29555",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_Regular",
    opacity: 0.7,
  },
  branchName: {
    fontSize: 28,
    color: "#c29555",
    marginTop: 15,
    fontFamily: "Poppins_Medium",
  },
  coinImg: {
    width: 27,
    height: 27,
    borderRadius: 50,
  },
  box: {
    borderWidth: 2,
    borderColor: "#363636",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 173,
    height: 45,
    flexDirection: "row",
    //justifyContent: "center",
  },
  desc: {
    opacity: 0.6,
    textAlign: "center",
    marginTop: -5,
  },
});

export default PartnerDetailScreen;
