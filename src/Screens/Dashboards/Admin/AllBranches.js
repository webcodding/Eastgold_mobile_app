import React, { Component, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";
import { AntDesign } from "@expo/vector-icons";
import SearchIcon from "../../../components/Icons/SearchIcon";
import { allPartners, allPartnersOffers } from "../../../demo-data";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "../../../components/Cards/CategoryCard";
import BranchCard from "../../../components/Cards/BranchCard";
import HotOffers from "../../../components/OfferCards/HotOffers";
import {
  getBranches,
  getCategories,
  getHotOffers,
  getManagers,
  getPartners,
  getWaiters,
} from "../../../apiService";

const AllBranches = ({ navigation, profile }) => {
  const [branches, setBranches] = useState([]);
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [managers, setManagers] = useState([]);
  const [waiter, setWaiter] = useState([]);
  const [hotOffers, setHotOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = profile.token;

  const fetchData = async () => {
    try {
      const [
        branchesData,
        partnersData,
        categoriesData,
        waitersData,
        managersData,
        hotOffersData,
      ] = await Promise.all([
        getBranches(token),
        getPartners(token),
        getCategories(token),
        getWaiters(token),
        getManagers(token),
        getHotOffers(token),
      ]);

      setBranches(branchesData.data);
      setPartners(partnersData);
      setCategories(categoriesData.data);
      setWaiter(waitersData.data);
      setManagers(managersData.data);
      setHotOffers(hotOffersData.data);
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

  if (loading) {
    return (
      <LayoutWrapper>
        <View style={[golbalStyle.container, { marginTop: 120 }]}>
          <ActivityIndicator size="large" color="#acacad" />
        </View>
      </LayoutWrapper>
    );
  }

  const shuffleBranches = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  return (
    <LayoutWrapper>
      <View style={[golbalStyle.container]}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification navigation={navigation} profile={profile} />
        </View>
        <ScrollView
          style={{ marginBottom: 100 }}
          refreshControl={
            // Add this RefreshControl
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            {/* Categories */}
            <View
              style={[
                golbalStyle.row,
                {
                  justifyContent: "space-between",
                  marginBottom: 15,
                },
              ]}
            >
              <Text style={[golbalStyle.normalText]}>All Categories</Text>
              <View style={[golbalStyle.row]}>
                {/* <SearchIcon
              navigateUrl={"AllPartnersSearchScreen"}
              navigation={navigation}
              data={allPartners}
            /> */}
                {/* ----- (add-category-Button) ---- */}
                <TouchableOpacity
                  style={[styles.btnContainer, golbalStyle.row]}
                  onPress={() => {
                    if (partners.length > 0) {
                    }
                    navigation.navigate("AddCategoryForm", { token: token });
                  }}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color="#c29555"
                    style={styles.icon}
                  />
                  <Text style={[golbalStyle.normalText, styles.btnTxt]}>
                    Add Category
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {categories.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <CategoryCard
                  categories={categories}
                  navigation={navigation}
                  navigationUrl={"BranchSearchScreen"}
                  data={{ branches: branches, token: token }}
                />
              </View>
            )}
            {/* Hot Offers */}
            <View
              style={[
                golbalStyle.row,
                {
                  justifyContent: "space-between",
                  marginBottom: 15,
                },
              ]}
            >
              <Text style={[golbalStyle.normalText]}>All Hot Offers</Text>
              <View style={[golbalStyle.row]}>
                {/* ----- (add-hot-offer-Button) ---- */}
                <TouchableOpacity
                  style={[styles.btnContainer, golbalStyle.row]}
                  onPress={() => {
                    if (partners.length > 0) {
                    }
                    navigation.navigate("AddHotOfferForm", { token: token });
                  }}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color="#c29555"
                    style={styles.icon}
                  />
                  <Text style={[golbalStyle.normalText, styles.btnTxt]}>
                    Add Hot Offer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <HotOffers
                hotOffers={hotOffers}
                navigation={navigation}
                partners={partners}
                waiters={waiter}
                categories={categories}
                token={token}
                profile={profile}
              />
            </View>
            {/*branches */}
            <View
              style={[
                golbalStyle.row,
                {
                  justifyContent: "space-between",
                  marginBottom: 15,
                  marginTop: -10,
                },
              ]}
            >
              <Text style={[golbalStyle.normalText]}>All Branches</Text>
              <View style={[golbalStyle.row]}>
                <SearchIcon
                  navigateUrl={"BranchSearchScreen"}
                  navigation={navigation}
                  data={{ branches: branches, token: token }}
                />
                {/* ----- (add-branch-Button) ---- */}
                <TouchableOpacity
                  style={[styles.btnContainer, golbalStyle.row]}
                  onPress={() => {
                    if (partners.length > 0) {
                    }
                    navigation.navigate("AddBranchForm", {
                      partners: partners.length > 0 && partners,
                      token: token,
                    });
                  }}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color="#c29555"
                    style={styles.icon}
                  />
                  <Text style={[golbalStyle.normalText, styles.btnTxt]}>
                    Add Branch
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {shuffleBranches(branches).map((item, index) => {
              return (
                <BranchCard
                  item={item}
                  key={index}
                  navigation={navigation}
                  partners={partners}
                  waiters={waiter}
                  categories={categories}
                  managers={managers}
                  token={token}
                  profile={profile}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
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
  branchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    // paddingVertical: 10,
    height: 120,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#383838",
    borderRadius: 4,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    elevation: 20,
  },
  name: {
    color: "#c29555",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  number: {
    opacity: 0.8,
    fontSize: 13,
  },
  discount: {
    color: "#c29555",
    fontFamily: "Poppins_Bold",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  partnerImage: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
});

export default AllBranches;
