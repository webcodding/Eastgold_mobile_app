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
} from "@expo/vector-icons";
import CustomerImg from "../../../assets/customer.png";
import WaiterImg from "../../../assets/waiter.png";
import Rating from "../../components/Rating";
import InputField from "../../components/Inputs/InputField";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import DeleteAlert from "../../components/Alert/DeleteAlert";
import StatusAlert from "../../components/Alert/StatusAlert";
import Alert from "../../components/Alert/Alert";
import { deleteBranch } from "../../apiService";

const BranchDetailScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("discounts");
  const [showdltAlert, setShowDltAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const branch = route.params.branch;
  const partner = route.params.partner;
  const category = route.params.category;
  const waiter = route.params.waiter;
  const manager = route.params.manager;
  const token = route.params.token;
  const profile = route.params.profile;
  // console.log(manager);

  const renderTabContent = () => {
    switch (activeTab) {
      case "discounts":
        return (
          <View style={[styles.tabContent]}>
            <LinearGradient
              colors={["#2a2a2b", "#191a1a"]}
              style={[golbalStyle.row, styles.discountBox]}
              start={{ x: 0.6, y: 0.4 }}
              end={{ x: 0.2, y: 1.8 }}
            >
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={[styles.topArrowContainer, { width: 40, height: 40 }]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1.3, y: 1.8 }}
              >
                <Entypo name="flow-branch" size={18} color="#c29555" />
              </LinearGradient>
              <Text
                style={[golbalStyle.normalText, { opacity: 0.7, fontSize: 18 }]}
              >
                Branch Discount:{" "}
              </Text>
              <Text
                style={[
                  golbalStyle.normalText,
                  { color: "#c29555", fontSize: 18 },
                ]}
              >
                {" "}
                {branch.branch_discount}%
              </Text>
            </LinearGradient>
            <LinearGradient
              colors={["#2a2a2b", "#191a1a"]}
              style={[golbalStyle.row, styles.discountBox]}
              start={{ x: 0.6, y: 0.4 }}
              end={{ x: 0.2, y: 1.8 }}
            >
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={[styles.topArrowContainer, { width: 40, height: 40 }]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1.3, y: 1.8 }}
              >
                <AntDesign name="shoppingcart" size={18} color="#c29555" />
              </LinearGradient>
              <Text
                style={[golbalStyle.normalText, { opacity: 0.7, fontSize: 18 }]}
              >
                Marketing Discount:{" "}
              </Text>
              <Text
                style={[
                  golbalStyle.normalText,
                  { color: "#c29555", fontSize: 18 },
                ]}
              >
                {" "}
                {branch.marketing_discount}%
              </Text>
            </LinearGradient>
          </View>
        );
      case "goldbacks":
        return (
          <View style={[styles.tabContent]}>
            <LinearGradient
              colors={["#2a2a2b", "#191a1a"]}
              style={[golbalStyle.row, styles.discountBox]}
              start={{ x: 0.6, y: 0.4 }}
              end={{ x: 0.2, y: 1.8 }}
            >
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={[styles.topArrowContainer, { width: 40, height: 40 }]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1.3, y: 1.8 }}
              >
                <Image
                  source={CustomerImg}
                  style={{ width: 25, height: 25, borderRadius: 50 }}
                />
              </LinearGradient>
              <Text
                style={[golbalStyle.normalText, { opacity: 0.7, fontSize: 16 }]}
              >
                Customer Gold Back:{" "}
              </Text>
              <Text
                style={[
                  golbalStyle.normalText,
                  { color: "#c29555", fontSize: 16 },
                ]}
              >
                {" "}
                {branch.customer_gold_back}gm
              </Text>
            </LinearGradient>
            <LinearGradient
              colors={["#2a2a2b", "#191a1a"]}
              style={[golbalStyle.row, styles.discountBox]}
              start={{ x: 0.6, y: 0.4 }}
              end={{ x: 0.2, y: 1.8 }}
            >
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={[styles.topArrowContainer, { width: 40, height: 40 }]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1.3, y: 1.8 }}
              >
                <Image
                  source={WaiterImg}
                  style={{ width: 25, height: 25, borderRadius: 50 }}
                />
              </LinearGradient>
              <Text
                style={[golbalStyle.normalText, { opacity: 0.7, fontSize: 16 }]}
              >
                Waiter Gold Back:{" "}
              </Text>
              <Text
                style={[
                  golbalStyle.normalText,
                  { color: "#c29555", fontSize: 16 },
                ]}
              >
                {" "}
                {branch.waiter_gold_back}gm
              </Text>
            </LinearGradient>
          </View>
        );
      case "contributors":
        return (
          <View style={styles.tabContent}>
            <Text style={[golbalStyle.normalText, { fontSize: 17 }]}>
              Managers
            </Text>
            {manager.length > 0 ? (
              manager.map((item, index) => (
                <View
                  style={[golbalStyle.row, { marginVertical: 10 }]}
                  key={index}
                >
                  <Image
                    src={item.image.url}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      marginRight: 10,
                    }}
                  />
                  <Text style={[golbalStyle.normalText, { opacity: 0.7 }]}>
                    {item.manager_name}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={[golbalStyle.normalText]}>No Managers</Text>
            )}
            <Text style={[golbalStyle.normalText, { fontSize: 17 }]}>
              Waiters
            </Text>
            {waiter.length > 0 ? (
              waiter.map((item, index) => (
                <View
                  style={[golbalStyle.row, { marginVertical: 10 }]}
                  key={index}
                >
                  <Image
                    src={item.image.url}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      marginRight: 10,
                    }}
                  />
                  <Text style={[golbalStyle.normalText, { opacity: 0.7 }]}>
                    {item.name}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={[golbalStyle.normalText]}>No Waiters</Text>
            )}
          </View>
        );
      case "reviews":
        return (
          <View style={styles.tabContent}>
            <Text
              style={[
                golbalStyle.normalText,
                { opacity: 0.7, marginBottom: 10 },
              ]}
            >
              No reviews to show.
            </Text>
            <View>
              <InputField placeholder={"Give a review"} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const handleDeleteBranch = async () => {
    try {
      const response = await deleteBranch(branch.id, token);
      if (response.ok) {
        setStatusAlert(true);
        setShowDltAlert(false);
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
        <Image source={{ uri: branch.image.url }} style={styles.branchImg} />
        <View style={styles.topContainer}>
          <PrevArrowButton />
          <View style={[golbalStyle.row, { marginRight: 20 }]}>
            {profile.user_type === "admin" ||
            profile.user_type === "partner" ? (
              <>
                <EditIcon
                  navigateUrl={"EditBranch"}
                  navigation={navigation}
                  data={{
                    branch: branch,
                    manager: manager,
                    partner: partner,
                    token: token,
                  }}
                />
                <DeleteIcon dltFunction={() => setShowDltAlert(true)} />
              </>
            ) : null}
          </View>
        </View>
      </View>

      {/* ---- Branch Detail -----  */}

      <LinearGradient
        colors={["#2d2e2e", "#191a1a", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.3, y: 0.5 }}
        style={[styles.roundContainer]}
      >
        {/*  Partner Logo */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PartnerDetail", {
              partner: partner,
              category: category,
              profile: profile,
            })
          }
        >
          <Image
            source={{ uri: partner.logo.url }}
            style={[styles.brandLogo]}
          />
        </TouchableOpacity>

        <ScrollView style={[golbalStyle.container]}>
          {/* name */}
          <Text style={[styles.text, styles.branchName]}>
            {" "}
            {branch.branch_name}
          </Text>
          {/* desc & rating */}
          <Text style={[golbalStyle.normalText, styles.desc]}>
            {branch.branch_description}
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
          {/* ------- */}
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
                {branch.work_start_time} {"-"}
              </Text>
              <Text style={[styles.text, styles.value]}>
                {" "}
                {branch.work_end_time}
              </Text>
            </View>
          </View>
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View>
              {/* location */}
              <View style={[golbalStyle.row, styles.box]}>
                <EvilIcons name="location" size={24} color="#c29555" />
                <Text style={[styles.text, styles.value]}>
                  {" "}
                  {branch.location}
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
                <Text
                  style={[golbalStyle.normalText, styles.text, styles.value]}
                >
                  {category.name}
                </Text>
              </View>
            </View>
            <View>
              {/* phone number */}
              <View style={[golbalStyle.row, styles.box]}>
                <AntDesign name="phone" size={18} color="#c29555" />
                <Text style={[styles.text, styles.value]}>
                  {" "}
                  {branch.phone_number}
                </Text>
              </View>
              {/* active */}
              <View style={[golbalStyle.row, styles.box]}>
                {branch.is_active == 1 ? (
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
                  {branch.is_active == 1 ? "Active" : "Not Active"}
                </Text>
              </View>
            </View>
          </View>
          {/* ------- */}
          {/* tabs */}
          <View style={[golbalStyle.row, styles.tabsContainer]}>
            <TouchableOpacity
              onPress={() => setActiveTab("discounts")}
              style={[
                styles.tab,
                activeTab === "discounts" && styles.activeTab,
              ]}
            >
              <Ionicons
                name="gift-outline"
                size={20}
                color={activeTab === "discounts" ? "#c29555" : "#fff"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "discounts" && styles.activeTabText,
                ]}
              >
                Discounts
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              onPress={() => setActiveTab("goldbacks")}
              style={[
                styles.tab,
                activeTab === "goldbacks" && styles.activeTab,
              ]}
            >
              <MaterialCommunityIcons
                name="gold"
                size={24}
                color={activeTab === "goldbacks" ? "#c29555" : "#fff"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "goldbacks" && styles.activeTabText,
                ]}
              >
                Gold Backs
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              onPress={() => setActiveTab("contributors")}
              style={[
                styles.tab,
                activeTab === "contributors" && styles.activeTab,
              ]}
            >
              <FontAwesome
                name="users"
                size={18}
                color={activeTab === "contributors" ? "#c29555" : "#fff"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "contributors" && styles.activeTabText,
                ]}
              >
                Contributors
              </Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              onPress={() => setActiveTab("reviews")}
              style={[styles.tab, activeTab === "reviews" && styles.activeTab]}
            >
              <MaterialIcons
                name="stars"
                size={20}
                color={activeTab === "reviews" ? "#c29555" : "#fff"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "reviews" && styles.activeTabText,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          {/* Tab Content */}
          {renderTabContent()}
          {/*------ */}
        </ScrollView>
      </LinearGradient>
      {showdltAlert && (
        <DeleteAlert
          text={"You want to delete this branch?"}
          setShowAlert={() => setShowDltAlert(false)}
          deleteFunction={handleDeleteBranch}
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
    paddingTop: 50,
    marginTop: -90,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    flex: 1,
  },
  branchImg: {
    width: "100%",
    height: 290,
  },
  brandLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: -100,
    marginBottom: 10,
  },
  infoCnt: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
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
    fontSize: 22,
    color: "#c29555",
  },
  coinImg: {
    width: 27,
    height: 27,
    borderRadius: 50,
  },
  box: {
    borderWidth: 2,
    borderColor: "#363636",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 170,
    height: 35,
    flexDirection: "row",
    //justifyContent: "center",
  },
  desc: {
    opacity: 0.6,
    textAlign: "center",
    marginTop: -5,
  },
  tabsContainer: {
    marginTop: 20,
    //borderBottomWidth: 1,
    // borderBottomColor: "#363636",
    justifyContent: "space-around",
  },
  tab: {
    //padding: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: "transparent",
    //marginHorizontal: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    // borderBottomWidth: 2,
    //borderBottomColor: "#c29555",
  },
  tabText: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
    fontSize: 10,
  },
  activeTabText: {
    color: "#c29555",
    fontSize: 11,
  },
  tabContent: {
    padding: 20,
    //textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  verticalLine: {
    width: 50,
    height: 1,
    backgroundColor: "#363636",
    marginHorizontal: -20,
    marginTop: -5,
  },
  discountBox: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#363636",
    borderRadius: 5,
  },
});

export default BranchDetailScreen;
