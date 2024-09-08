import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";
import CategoryCard from "../../../components/Cards/CategoryCard";
import { promotionBanner } from "../../../demo-data";
import { ScrollView } from "react-native-gesture-handler";
import SmallBranchCard from "../../../components/OfferCards/SmallBranchCard";
import PromotionSlider from "../../../components/PromotionSlider";
import ChatIcon from "../../../components/Icons/ChatIcon";
import UserLocationIcon from "../../../components/Icons/UserLocationIcon";
import HotOffers from "../../../components/OfferCards/HotOffers";
import SearchIcon from "../../../components/Icons/SearchIcon";
import {
  getBranches,
  getCategories,
  getHotOffers,
  getManagers,
  getPartners,
  getWaiters,
} from "../../../apiService";

const CustomerDashboard = ({ navigation, profile }) => {
  const [branches, setBranches] = useState([]);
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [waiter, setWaiter] = useState([]);
  const [manager, setManager] = useState([]);
  const [hotOffers, setHotOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = profile.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          branchesData,
          partnersData,
          categoriesData,
          waitersData,
          managerData,
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
        setManager(managerData.data);
        setHotOffers(hotOffersData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <LayoutWrapper>
        <ActivityIndicator
          size="large"
          color="#acacad"
          style={{ marginTop: 150 }}
        />
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <View style={[golbalStyle.container, { marginBottom: 90 }]}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <View style={[golbalStyle.row]}>
            <ChatIcon />
            <ProfileNotification
              navigation={navigation}
              profile={profile}
              navigateUrl={"Profile"}
            />
          </View>
        </View>
        <View
          style={[
            golbalStyle.topProfileContainer,
            { marginTop: -20, marginBottom: 10 },
          ]}
        >
          {/*--- location ---- */}
          <UserLocationIcon />
          {/* ----- Search Button ---- */}
          <SearchIcon
            navigateUrl={"BranchSearchScreen"}
            navigation={navigation}
            data={{ branches: branches, token: token }}
          />
        </View>
        {/* Categories */}
        <View style={{ marginBottom: 15 }}>
          <CategoryCard
            categories={categories}
            navigation={navigation}
            navigationUrl={"BranchSearchScreen"}
            data={{ branches: branches, token: token }}
          />
        </View>

        {/*------ Main Content ----- */}
        <ScrollView>
          {/* Slider */}
          <View style={{ marginVertical: 20 }}>
            <PromotionSlider data={promotionBanner} />
          </View>
          {/* Hot offers */}
          <Text style={[golbalStyle.normalText, styles.titles]}>
            Hot Offers
          </Text>
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

          {/* Branches */}
          <Text style={[golbalStyle.normalText, styles.titles]}>Offers</Text>
          <View>
            <SmallBranchCard
              branchData={branches}
              navigation={navigation}
              partners={partners}
              waiters={waiter}
              categories={categories}
              manager={manager}
              token={token}
              profile={profile}
            />
          </View>

          {/* ====================== */}
        </ScrollView>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  titles: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default CustomerDashboard;
