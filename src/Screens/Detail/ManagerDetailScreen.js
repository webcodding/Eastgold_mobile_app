import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import DeleteAlert from "../../components/Alert/DeleteAlert";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import StatusAlert from "../../components/Alert/StatusAlert";
import { deleteManager } from "../../apiService";

const ManagerDetailScreen = ({ navigation, route }) => {
  const manager = route.params.manager;
  const branch = route.params.branch;
  const token = route.params.token;
  const profile = route.params.profile;

  //console.log(manager);
  const [showdltAlert, setShowDltAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleDeleteManager = async () => {
    try {
      const response = await deleteManager(manager.id, token);

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
            {profile.user_type === "admin" ||
            profile.user_type === "partner" ? (
              <>
                <EditIcon
                  navigateUrl={"EditManager"}
                  navigation={navigation}
                  data={{
                    manager: manager,
                    branch: Array.isArray(branch) ? [] : branch,
                    token: token,
                  }}
                />
                <DeleteIcon dltFunction={() => setShowDltAlert(true)} />
              </>
            ) : null}
          </View>
        </View>
      </View>
      {/* ------ */}
      <View style={[golbalStyle.container, styles.container]}>
        <Image
          src={manager.image.url}
          style={[golbalStyle.image, styles.img]}
        />
        {manager.is_active == 1 && <View style={styles.active}></View>}

        {/* name */}
        <Text style={[styles.text, styles.name]}> {manager.manager_name}</Text>

        <ScrollView>
          <Text style={styles.heading}>Branch Info:</Text>
          <View style={styles.border}></View>

          {Array.isArray(branch) ? (
            <Text style={[golbalStyle.normalText, styles.branchName]}>
              No Branch Added!
            </Text>
          ) : (
            <>
              {/* branch */}
              <View style={[golbalStyle.row]}>
                <Image src={branch.image.url} style={styles.branchImg} />
                <Text style={[golbalStyle.normalText, styles.branchName]}>
                  {branch.branch_name}
                </Text>
              </View>
              {/* location */}
              <View style={[golbalStyle.row, { marginVertical: 10 }]}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#242526"]}
                  style={[styles.topArrowContainer]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1.3, y: 1.8 }}
                >
                  <Ionicons name="location-outline" size={18} color="#c29555" />
                </LinearGradient>
                <Text
                  style={[
                    golbalStyle.normalText,
                    styles.branchName,
                    { fontSize: 14 },
                  ]}
                >
                  {branch.location}
                </Text>
              </View>
              {/* phone number */}
              <View style={[golbalStyle.row, { marginVertical: 10 }]}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#242526"]}
                  style={[styles.topArrowContainer]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1.3, y: 1.8 }}
                >
                  <Feather name="phone" size={17} color="#c29555" />
                </LinearGradient>
                <Text
                  style={[
                    golbalStyle.normalText,
                    styles.branchName,
                    { fontSize: 14 },
                  ]}
                >
                  {branch.phone_number}
                </Text>
              </View>
            </>
          )}

          <Text style={styles.heading}>Personal Info:</Text>
          <View style={styles.border}></View>
          {/* Salary */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <FontAwesome6
                name="money-bill-1-wave"
                size={17}
                color="#c29555"
              />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              Salary:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.salery}
            </Text>
          </View>
          {/* Discount */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <Feather name="gift" size={17} color="#c29555" />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              Discount:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.discount}%
            </Text>
          </View>
          {/* Phone */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <Feather name="phone" size={17} color="#c29555" />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              Phone:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.phone_number}
            </Text>
          </View>
          {/* Fin */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={18}
                color="#c29555"
              />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              NID:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.fin}
            </Text>
          </View>
          {/* Address */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <Ionicons name="location-outline" size={18} color="#c29555" />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              Address:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.address}
            </Text>
          </View>
          {/* Education */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <FontAwesome6 name="graduation-cap" size={17} color="#c29555" />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              Education:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.education}
            </Text>
          </View>
          {/* Date of birth */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <Fontisto name="date" size={17} color="#c29555" />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              Date of birth:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.death_of_birth}
            </Text>
          </View>
          {/* Guardian Info */}
          <View style={[golbalStyle.row, { marginVertical: 10 }]}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#242526"]}
              style={[styles.topArrowContainer]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1.3, y: 1.8 }}
            >
              <Feather name="info" size={17} color="#c29555" />
            </LinearGradient>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14, marginLeft: 3 },
              ]}
            >
              Guardian Info:{" "}
            </Text>
            <Text
              style={[
                golbalStyle.normalText,
                styles.branchName,
                { fontSize: 14 },
              ]}
            >
              {manager.guardian_info}
            </Text>
          </View>
        </ScrollView>
      </View>

      {showdltAlert && (
        <DeleteAlert
          text={"You want to delete this Offer?"}
          setShowAlert={() => setShowDltAlert(false)}
          deleteFunction={handleDeleteManager}
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
  topArrowContainer: {
    width: 30,
    height: 30,
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
  img: {
    alignSelf: "center",
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    color: "#c29555",
    marginTop: 15,
    fontFamily: "Poppins_Regular",
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    fontFamily: "Nunito_Regular",
    color: "#fff",
    marginBottom: 3,
  },
  border: {
    backgroundColor: "#c29555",
    height: 2.5,
    width: 130,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 15,
  },
  branchImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  branchName: {
    marginLeft: 12,
    fontSize: 16,
    opacity: 0.8,
  },
  active: {
    backgroundColor: "green",
    width: 15,
    height: 15,
    borderRadius: 50,
    position: "absolute",
    top: 160,
    right: 118,
  },
});

export default ManagerDetailScreen;
