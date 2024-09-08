import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import { golbalStyle } from "../../GlobalStyles";
import PrevArrowButton from "../../components/PrevArrowButton";
import SearchBar from "../../components/SearchBar";
import WaiterCard from "../../components/Cards/WaiterCard";
import { LinearGradient } from "expo-linear-gradient";
import { getBranches } from "../../apiService";

const AllWaiterSearchScreen = ({ route, navigation }) => {
  const waiterData = route.params.branchData[0];
  const allBranches = route.params.branchData[1];
  const token = route.params.branchData[2];
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchData] = await Promise.all([getBranches(token)]);
        setBranches(branchData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  // Function to filter waiters by waiter name, branch name or location
  const filterWaiters = (waiters, branches, query) => {
    if (!query) return waiters;
    return waiters.filter((waiter) => {
      const branch = branches.find(
        (branch) => branch.id === parseInt(waiter.branch_id)
      );
      if (!branch) return false;
      return (
        branch.branch_name.toLowerCase().trim().includes(query.toLowerCase()) ||
        branch.location.toLowerCase().includes(query.toLowerCase()) ||
        waiter.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const filteredWaiters = filterWaiters(waiterData, branches, searchQuery);

  if (isLoading) {
    return (
      <LayoutWrapper>
        <View style={[golbalStyle.container, { marginTop: 120 }]}>
          <ActivityIndicator size="large" color="#acacad" />
        </View>
      </LayoutWrapper>
    );
  }

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
          placeholder={"Search by waiter name, branch name or location"}
        />
        {/*------ Waiter Cards---- */}
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <FlatList
            data={filteredWaiters}
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
                        {item.name}
                      </Text>
                      {matchedBranches.map((branch) => (
                        <View style={[golbalStyle.column]} key={branch.id}>
                          <Text
                            style={[golbalStyle.normalText, styles.branchName]}
                          >
                            {branch.branch_name}
                          </Text>
                          <Text
                            style={[golbalStyle.normalText, styles.location]}
                          >
                            {branch.location}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
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

export default AllWaiterSearchScreen;
