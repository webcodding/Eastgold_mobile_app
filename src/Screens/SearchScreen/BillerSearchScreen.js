import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import SearchBar from "../../components/SearchBar";

const BillerSearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const biller = route.params.allBillers;

  // Filter the billers based on the search query for name or codeId
  const filteredBiller = biller.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.codeId.toString().includes(searchQuery.toLowerCase())
  );
  // console.log(filteredBiller);

  return (
    <LayoutWrapper>
      <View style={styles.container}>
        {/* ----- Top content ---- */}
        <View style={styles.topContainer}>
          <PrevArrowButton />
        </View>
        {/* ----- Search bar ---- */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={"Search by name or ID"}
        />

        {/* Display filtered billers */}
        <FlatList
          data={filteredBiller}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.billerItem}>
              <View style={styles.rightContainer}>
                <Text style={styles.codeId}>{item.codeId}</Text>
                <Text style={styles.billerTitle}>{item.title}</Text>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#242526"]}
                style={styles.imageContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.3, y: 0.5 }}
              >
                <View style={styles.imageShadow}>
                  <Image source={item.image} style={styles.recentCardImg} />
                </View>
              </LinearGradient>
            </View>
          )}
        />
      </View>
    </LayoutWrapper>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  searchMainContainer: {
    height: 54,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 0.7,
    borderColor: "#383838",
    shadowColor: "#4e4d4f",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 14,
  },
  inputText: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
    width: "60%",
    opacity: 0.7,
  },
  searchIcon: {
    marginLeft: -20,
  },
  listContainer: {
    marginVertical: 10,
  },
  billerItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#383838",
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  billerTitle: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    opacity: 0.5,
    fontSize: 18,
  },
  codeId: {
    color: "#6d6f70",
    fontFamily: "Poppins_Medium",
    opacity: 0.9,
    fontSize: 12,
  },
  typeText: {
    color: "#6d6f70",
    fontFamily: "Poppins_Medium",
    opacity: 0.9,
    fontSize: 11,
    marginTop: 6,
  },
  rightContainer: {
    flexDirection: "column",
  },
  imageContainer: {
    //backgroundColor: "#2d2e2e",
    width: 60,
    height: 60,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageShadow: {
    width: 70,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  recentCardImg: {
    width: 50,
    height: 40,
    objectFit: "contain",
  },
});

export default BillerSearchScreen;
