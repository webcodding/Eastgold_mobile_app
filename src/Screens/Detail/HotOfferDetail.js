import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import { golbalStyle } from "../../GlobalStyles";
import PrevArrowButton from "../../components/PrevArrowButton";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import {
  EvilIcons,
  MaterialIcons,
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import CustomerImg from "../../../assets/customer.png";
import WaiterImg from "../../../assets/waiter.png";
import Rating from "../../components/Rating";
import InputField from "../../components/Inputs/InputField";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import DeleteAlert from "../../components/Alert/DeleteAlert";
import BranchCard from "../../components/Cards/BranchCard";
import StatusAlert from "../../components/Alert/StatusAlert";
import { deleteHotOffer } from "../../apiService";

const HotOfferDetailScreen = ({ navigation, route }) => {
  const [showdltAlert, setShowDltAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const hotOffer = route.params.hotOffer;
  const token = route.params.token;
  const profile = route.params.profile;
  const partners = route.params.partners;
  const waiters = route.params.waiters;
  const categories = route.params.categories;

  const handleDelete = async () => {
    try {
      const response = await deleteHotOffer(hotOffer.id, token);

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
        <Image
          source={{ uri: hotOffer.offer_image.url }}
          style={styles.branchImg}
        />
        <View style={styles.topContainer}>
          <PrevArrowButton />
          <View style={[golbalStyle.row, { marginRight: 20 }]}>
            {profile.user_type === "admin" ? (
              <>
                <EditIcon
                  navigateUrl={"EditHotOffer"}
                  navigation={navigation}
                  data={{ hotOffer: hotOffer, token: token }}
                />
                <DeleteIcon dltFunction={() => setShowDltAlert(true)} />
              </>
            ) : null}
          </View>
        </View>
      </View>

      {/* ---- Offer Detail -----  */}

      <LinearGradient
        colors={["#2d2e2e", "#191a1a", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.3, y: 0.5 }}
        style={[styles.roundContainer]}
      >
        {/* name */}

        <Text style={[styles.text, styles.branchName]}>
          {" "}
          {hotOffer.offer_name}
        </Text>
        {/* ------- */}
        <ScrollView style={[golbalStyle.container]}>
          {/* boxes */}
          <View style={[golbalStyle.row, { justifyContent: "center" }]}>
            {/* active */}
            <View
              style={[
                golbalStyle.row,
                styles.box,
                { justifyContent: "center" },
              ]}
            >
              {hotOffer.is_active == 1 ? (
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
                {hotOffer.is_active == 1 ? "Active" : "Not Active"}
              </Text>
            </View>
          </View>
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            {/* discount */}
            <View style={[golbalStyle.row, styles.box]}>
              <Ionicons
                name="gift"
                size={18}
                color="#c29555"
                style={{ marginTop: -3, marginRight: 2 }}
              />

              <Text style={[styles.text, styles.value]}>
                {" "}
                {hotOffer.discount}% Discount
              </Text>
            </View>
            {/* gold Offer */}
            <View style={[golbalStyle.row, styles.box]}>
              <FontAwesome5
                name="coins"
                size={18}
                color="#c29555"
                style={{ marginTop: -3, marginRight: 2 }}
              />

              <Text style={[styles.text, styles.value]}>
                {" "}
                {hotOffer.gold_offer}gm gold offer
              </Text>
            </View>
          </View>
          {/* ------- */}
          {/* branches */}
          {/* <Text style={styles.heading}>This Offer Branches:</Text>
          <View style={styles.border}></View>
          {hotOffer.branches.map((item, index) => (
            <BranchCard
              item={item}
              key={index}
              navigation={navigation}
              partners={partners}
              waiters={waiters}
              categories={categories}
            />
          ))} */}
          {/*------ */}
        </ScrollView>
      </LinearGradient>
      {showdltAlert && (
        <DeleteAlert
          text={"You want to delete this Offer?"}
          setShowAlert={() => setShowDltAlert(false)}
          deleteFunction={handleDelete}
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
  roundContainer: {
    paddingTop: 20,
    marginTop: -50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    flex: 1,
  },
  branchImg: {
    width: "100%",
    height: 290,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_Regular",
    opacity: 0.7,
  },
  branchName: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "Nunito_Bold",
    marginBottom: 20,
    textAlign: "center",
    opacity: 1,
  },
  box: {
    borderWidth: 2,
    borderColor: "#363636",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 170,
    height: 45,
    flexDirection: "row",
    //justifyContent: "center",
  },
  nameContainer: {
    width: 230,
    height: 40,
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 5,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Nunito_Regular",
    color: "#fff",
    marginBottom: 3,
    marginTop: 15,
  },
  border: {
    backgroundColor: "#c29555",
    height: 2.5,
    width: 190,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 15,
  },
});

export default HotOfferDetailScreen;
