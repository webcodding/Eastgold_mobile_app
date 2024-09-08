import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";
import { allPartnersOffers } from "../../../demo-data";
import SearchIcon from "../../../components/Icons/SearchIcon";
import PartnerCard from "../../../components/Cards/PartnerCard";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import WaiterCard from "../../../components/Cards/WaiterCard";
import ManagerCard from "../../../components/Cards/ManagerCard";
import {
  getBranches,
  getManagers,
  getPartners,
  getWaiters,
} from "../../../apiService";

const AllUsers = ({ navigation, profile }) => {
  const [partners, setPartners] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add this state
  const token = profile.token;

  const fetchData = async () => {
    try {
      const [branchesData, partnersData, waitersData, managersData] =
        await Promise.all([
          getBranches(token),
          getPartners(token),
          getWaiters(token),
          getManagers(token),
        ]);

      setBranches(branchesData.data);
      setPartners(partnersData);
      setWaiters(waitersData.data);
      setManagers(managersData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (loading || refreshing) {
    return (
      <LayoutWrapper>
        <View style={[golbalStyle.container, { marginTop: 120 }]}>
          <ActivityIndicator size="large" color="#acacad" />
        </View>
      </LayoutWrapper>
    );
  }

  let allCashierImages = [];
  let allManagerImages = [];
  let allCustomerImages = [];

  allPartnersOffers.forEach((partnerOffer) => {
    partnerOffer.branches.forEach((branch) => {
      allManagerImages.push(branch.manager.image);
      branch.cashier.forEach((cashier) => {
        allCashierImages.push(cashier.image);
      });
      branch.customer.forEach((customer) => {
        allCustomerImages.push(customer.image);
      });
    });
  });

  return (
    <LayoutWrapper>
      <ScrollView
        refreshControl={
          // Add this RefreshControl
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          <ScrollView style={{ flex: 1, marginBottom: 50 }}>
            {/* Partners */}
            <View
              style={[
                golbalStyle.row,
                {
                  justifyContent: "space-between",
                  marginBottom: 15,
                },
              ]}
            >
              <Text style={[golbalStyle.normalText]}>All Partners</Text>
              <View style={[golbalStyle.row]}>
                <SearchIcon
                  navigateUrl={"AllPartnerSearchScreen"}
                  navigation={navigation}
                  data={{ partners: partners, token: token }}
                />
                {/* ----- (add-partner-Button) ---- */}
                <TouchableOpacity
                  style={[styles.btnContainer, golbalStyle.row]}
                  onPress={() =>
                    navigation.navigate("AddPartnerForm", { token: token })
                  }
                >
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color="#c29555"
                    style={styles.icon}
                  />
                  <Text style={[golbalStyle.normalText, styles.btnTxt]}>
                    Add Partner
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.row}
            >
              {partners.length > 0 &&
                partners
                  .slice(-4)
                  .map((item, index) => (
                    <PartnerCard
                      key={index}
                      item={item}
                      navigation={navigation}
                      token={token}
                      profile={profile}
                    />
                  ))}
              {partners.length > 3 && (
                <TouchableOpacity
                  //onPress={() => console.log("See All Waiters")}
                  style={styles.seeBtn}
                >
                  <LinearGradient
                    style={styles.boxContainer}
                    colors={["#2d2e2e", "#191a1a", "#000000"]}
                    start={{ x: 0.6, y: 0.4 }}
                    end={{ x: 0.2, y: 1.8 }}
                  >
                    <Text style={[golbalStyle.normalText]}>See All</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </ScrollView>
            {/* -------- */}
            {/* Managers */}
            <View
              style={[
                golbalStyle.row,
                {
                  justifyContent: "space-between",
                  marginBottom: 15,
                },
              ]}
            >
              <Text style={[golbalStyle.normalText]}>All Managers</Text>
              <View style={[golbalStyle.row]}>
                <SearchIcon
                  navigateUrl={"AllManagerSearch"}
                  navigation={navigation}
                  data={{
                    managers: managers,
                    token: token,
                    branches: branches,
                  }}
                />
                {/* ----- (add-manager-Button) ---- */}
                <TouchableOpacity
                  style={[styles.btnContainer, golbalStyle.row]}
                  onPress={() =>
                    navigation.navigate("AddManagerForm", { token: token })
                  }
                >
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color="#c29555"
                    style={styles.icon}
                  />
                  <Text style={[golbalStyle.normalText, styles.btnTxt]}>
                    Add Manager
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.row}
            >
              {managers.length > 0 &&
                branches.length > 0 &&
                managers
                  .slice(-4)
                  .map((item, index) => (
                    <ManagerCard
                      key={index}
                      item={item}
                      branches={branches}
                      navigation={navigation}
                      token={token}
                      profile={profile}
                    />
                  ))}

              {managers.length > 3 && (
                <TouchableOpacity
                  //onPress={() => console.log("See All Waiters")}
                  style={styles.seeAllButton}
                >
                  <LinearGradient
                    style={styles.boxContainer}
                    colors={["#2d2e2e", "#191a1a", "#000000"]}
                    start={{ x: 0.6, y: 0.4 }}
                    end={{ x: 0.2, y: 1.8 }}
                  >
                    <Text style={[golbalStyle.normalText]}>See All</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </ScrollView>
            {/* -------- */}
            {/* Waiters */}
            <View
              style={[
                golbalStyle.row,
                {
                  justifyContent: "space-between",
                  marginBottom: 15,
                },
              ]}
            >
              <Text style={[golbalStyle.normalText]}>All Waiters</Text>
              <View style={[golbalStyle.row]}>
                <SearchIcon
                  navigateUrl={"AllWaiterSearch"}
                  navigation={navigation}
                  data={[waiters, branches, token]}
                />
                {/* ----- (add-waiter-Button) ---- */}
                <TouchableOpacity
                  style={[styles.btnContainer, golbalStyle.row]}
                  onPress={() =>
                    navigation.navigate("AddCashierForm", { token: token })
                  }
                >
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color="#c29555"
                    style={styles.icon}
                  />
                  <Text style={[golbalStyle.normalText, styles.btnTxt]}>
                    Add Waiter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.row}
            >
              {waiters.length > 0 &&
                branches.length > 0 &&
                waiters
                  .slice(-4)
                  .map((item, index) => (
                    <WaiterCard
                      key={index}
                      item={item}
                      branches={branches}
                      managers={managers}
                      navigation={navigation}
                      token={token}
                      profile={profile}
                    />
                  ))}
              {waiters.length > 3 && (
                <TouchableOpacity
                  //onPress={() => console.log("See All Waiters")}
                  style={styles.seeAllButton}
                >
                  <LinearGradient
                    style={styles.boxContainer}
                    colors={["#2d2e2e", "#191a1a", "#000000"]}
                    start={{ x: 0.6, y: 0.4 }}
                    end={{ x: 0.2, y: 1.8 }}
                  >
                    <Text style={[golbalStyle.normalText]}>See All</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </ScrollView>
            {/* -------- */}
          </ScrollView>
        </View>
      </ScrollView>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 50,
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
  seeAllButton: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 30,
  },
  boxContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  seeBtn: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});

export default AllUsers;
