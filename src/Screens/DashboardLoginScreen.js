import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { allUserProfileInfo } from "../demo-data";
import LayoutWrapper from "../components/LayoutWrapper";
import PrevArrowButton from "../components/PrevArrowButton";

const DashboardLogin = ({ navigation, route }) => {
  return (
    <LayoutWrapper>
      <View style={styles.topContent}>
        <PrevArrowButton />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AdminBottomTabs", {
              profile: profileData.admin,
            })
          }
        >
          <Text style={styles.link}>Admin Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PartnerBottomTabs", {
              profile: profileData.partner,
            })
          }
        >
          <Text style={styles.link}>Partner Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CustomerBottomTabs", {
              profile: profileData.customer,
            })
          }
        >
          <Text style={styles.link}>Customer Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ManagerBottomTabs", {
              profile: profileData.manager,
            })
          }
        >
          <Text style={styles.link}>Manager Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("StaffBottomTabs", {
              profile: profileData.cashier,
            })
          }
        >
          <Text style={styles.link}>Cashier Dashboard</Text>
        </TouchableOpacity>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 250,
  },
  link: {
    color: "#fff",
    textDecorationLine: "underline",
    fontFamily: "Poppins_Bold",
    fontSize: 16,
    marginVertical: 10,
  },
  topContent: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DashboardLogin;
