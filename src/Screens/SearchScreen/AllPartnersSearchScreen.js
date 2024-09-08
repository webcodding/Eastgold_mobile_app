import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import { golbalStyle } from "../../GlobalStyles";
import PrevArrowButton from "../../components/PrevArrowButton";
import SearchBar from "../../components/SearchBar";
import BranchCard from "../../components/Cards/BranchCard";
import { FlatList } from "react-native";
import PartnerCard from "../../components/Cards/PartnerCard";

const AllPartnerSearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const partnerData = route.params.branchData.partners;
  const token = route.params.branchData.token;

  const filteredPartner = partnerData.filter(
    (item) =>
      item.resturent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.resturent_location
        .toLowerCase()
        .trim()
        .includes(searchQuery.toLowerCase())
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
          placeholder={"Search by partner name or location"}
        />
        {/*------ Partner Cards---- */}
        <FlatList
          data={filteredPartner}
          renderItem={({ item }) => (
            <PartnerCard
              item={item}
              navigation={navigation}
              style={{
                width: 340,
                marginRight: 0,
                marginVertical: 10,
                marginLeft: 10,
              }}
              extraStyle={{ width: 120 }}
              imgStyle={{ width: 60, height: 60 }}
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

export default AllPartnerSearchScreen;
