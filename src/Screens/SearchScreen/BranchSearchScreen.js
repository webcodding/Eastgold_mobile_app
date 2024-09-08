import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import { golbalStyle } from "../../GlobalStyles";
import PrevArrowButton from "../../components/PrevArrowButton";
import SearchBar from "../../components/SearchBar";
import BranchCard from "../../components/Cards/BranchCard";
import { FlatList } from "react-native";
import {
  getCategories,
  getManagers,
  getPartners,
  getWaiters,
} from "../../apiService";

const BranchSearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [managers, setManagers] = useState([]);
  const [waiter, setWaiter] = useState([]);
  const [loading, setLoading] = useState(true);

  const branchData = route.params.branchData.branches;
  const token = route.params.branchData.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnerData, categoryData, waiterData, managerData] =
          await Promise.all([
            getPartners(token),
            getCategories(token),
            getWaiters(token),
            getManagers(token),
          ]);
        setPartners(partnerData);
        setCategories(categoryData.data);
        setWaiter(waiterData.data);
        setManagers(managerData.data);
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
        <View style={[golbalStyle.container, { marginTop: 120 }]}>
          <ActivityIndicator size="large" color="#acacad" />
        </View>
      </LayoutWrapper>
    );
  }

  const filteredBranch = branchData.filter((branch) => {
    const branchNameMatches = branch.branch_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const branchLocationMatches = branch.location
      .toLowerCase()
      .trim()
      .includes(searchQuery.toLowerCase());

    const partner = partners.find(
      (partner) => partner.id === parseInt(branch.partner_id)
    );
    const categoryMatches = categories.find((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const partnerCategoryMatches = categoryMatches
      ? partner && parseInt(partner.partner_category_id) === categoryMatches.id
      : false;

    return branchNameMatches || branchLocationMatches || partnerCategoryMatches;
  });
  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* ----- Top content ---- */}
        <View style={styles.topContainer}>
          <PrevArrowButton />
        </View>
        {/* ----- Search bar ---- */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={"Search by name, location or category"}
        />
        {/*------ Branch Cards---- */}
        <FlatList
          data={filteredBranch}
          renderItem={({ item }) => (
            <BranchCard
              item={item}
              navigation={navigation}
              partners={partners}
              waiters={waiter}
              categories={categories}
              managers={managers}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
});

export default BranchSearchScreen;
