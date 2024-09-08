import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import { golbalStyle } from "../../GlobalStyles";
import PrevArrowButton from "../../components/PrevArrowButton";
import SearchBar from "../../components/SearchBar";
import BranchCard from "../../components/OfferCards/BranchCard";

const MyBranchesSearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const branchData = route.params.branchData;

  const filteredBranch = branchData.filter(
    (item) =>
      item.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().trim().includes(searchQuery.toLowerCase())
  );
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
          placeholder={"Search by branch or category"}
        />
        {/*------ Branch Cards---- */}

        <BranchCard branchData={filteredBranch} navigation={navigation} />
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

export default MyBranchesSearchScreen;
