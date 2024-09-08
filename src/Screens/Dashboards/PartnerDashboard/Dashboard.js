import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";
import { allPartnersOffers, partnerBranches } from "../../../demo-data";
import { LinearGradient } from "expo-linear-gradient";
import RenderSmallProfiles from "../../../components/RenderSmallProfiles";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import BranchCard from "../../../components/OfferCards/BranchCard";
import SearchIcon from "../../../components/Icons/SearchIcon";

const PartnerDashboard = ({ navigation, profile }) => {
  const branchData = partnerBranches;

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification
            navigation={navigation}
            profile={profile}
            navigateUrl={"Profile"}
          />
        </View>
        {/* ----- Main Contents Start ---- */}
        <View style={styles.mainContents}>
          <View
            style={[
              golbalStyle.topProfileContainer,
              { marginTop: 0, marginBottom: 10 },
            ]}
          >
            <Text style={[golbalStyle.normalText, styles.heading]}>
              Your All Branches
            </Text>
            <View style={[golbalStyle.row]}>
              {/* ----- Search Button ---- */}
              <SearchIcon
                navigateUrl={"MyBranchSearchScreen"}
                navigation={navigation}
                data={branchData}
              />
              {/* ----- Add Branch Button ---- */}
              <TouchableOpacity
                style={[styles.btnContainer, golbalStyle.row]}
                onPress={() => navigation.navigate("AddBranchForm")}
              >
                <AntDesign
                  name="pluscircleo"
                  size={20}
                  color="#c29555"
                  style={styles.icon}
                />
                <Text style={[golbalStyle.normalText, styles.btnTxt]}>
                  Add branch
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*------ Branch Cards---- */}
          <View style={{ marginBottom: 290 }}>
            <BranchCard branchData={branchData} navigation={navigation} />
          </View>
          {/* ----------------- */}
        </View>
        {/* ----- Main Contents end---- */}
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  mainContents: {
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    opacity: 0.7,
  },

  btnContainer: {
    width: 120,
    height: 35,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#c29555",
  },
  btnTxt: {
    fontSize: 12,
    marginLeft: 5,
    opacity: 0.6,
  },
  icon: {
    marginTop: 0,
  },
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 35,
    height: 35,
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
  searchIcon: {
    opacity: 0.4,
  },
  searchCont: {
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    borderRadius: 50,
  },
});

export default PartnerDashboard;
