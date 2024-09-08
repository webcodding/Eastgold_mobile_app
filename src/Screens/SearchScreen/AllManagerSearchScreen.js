import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import { golbalStyle } from "../../GlobalStyles";
import PrevArrowButton from "../../components/PrevArrowButton";
import SearchBar from "../../components/SearchBar";
import BranchCard from "../../components/Cards/BranchCard";
import { FlatList } from "react-native";
import PartnerCard from "../../components/Cards/PartnerCard";
import { LinearGradient } from "expo-linear-gradient";

const AllManagerSearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const managers = route.params.branchData.managers;
  const branches = route.params.branchData.branches;
  const token = route.params.branchData.token;

  const filteredManager = managers.filter(
    (item) =>
      item.manager_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().trim().includes(searchQuery.toLowerCase())
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
          placeholder={"Search by branch name or location"}
        />
        {/*------ Partner Cards---- */}
        <FlatList
          data={filteredManager}
          renderItem={({ item }) => {
            const matchedBranches = branches.filter(
              (branch) => branch.id === parseInt(item.branch_id)
            );
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("WaiterDetail", {
                    waiter: item,
                    branch: matchedBranches[0],
                  })
                }
              >
                <LinearGradient
                  colors={["#2a2a2b", "#191a1a"]}
                  style={[styles.historyItem]}
                  start={{ x: 0.6, y: 0.4 }}
                  end={{ x: 0.2, y: 1.8 }}
                >
                  <View>
                    <Image src={item.image.url} style={styles.image} />
                    {item.is_active == 1 && (
                      <View style={styles.activeView}></View>
                    )}
                  </View>
                  <View style={[golbalStyle.column, { marginLeft: 30 }]}>
                    <Text style={[golbalStyle.normalText, styles.name]}>
                      {item.manager_name}
                    </Text>
                    {matchedBranches.map((branch) => (
                      <View style={[golbalStyle.column]} key={branch.id}>
                        <Text
                          style={[golbalStyle.normalText, styles.branchName]}
                        >
                          {branch.branch_name}
                        </Text>
                        <Text style={[golbalStyle.normalText, styles.location]}>
                          {branch.location}
                        </Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
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
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingVertical: 10,
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  activeView: {
    position: "absolute",
    backgroundColor: "green",
    width: 10,
    height: 10,
    borderRadius: 50,
    top: 50,
    right: 2,
  },
  name: {
    color: "#c29555",
    fontSize: 18,
  },
  branchName: {
    color: "#acacad",
    textDecorationLine: "underline",
  },
  location: {
    opacity: 0.6,
    fontSize: 12,
  },
});

export default AllManagerSearchScreen;
