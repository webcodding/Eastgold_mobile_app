import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";
import BranchCard from "../../../components/Cards/BranchCard";

import SearchIcon from "../../../components/Icons/SearchIcon";
import CustomDropdown from "../../../components/dropdown/CustomDropdown";
import {
  getBranches,
  getCategories,
  getManagers,
  getPartners,
  getWaiters,
} from "../../../apiService";

const Offers = ({ navigation, profile, route }) => {
  const [branches, setBranches] = useState([]);
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [waiter, setWaiter] = useState([]);
  const [manager, setManager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [noBranchesMessage, setNoBranchesMessage] = useState("");
  const token = profile.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          branchesData,
          partnersData,
          categoriesData,
          waitersData,
          managersData,
        ] = await Promise.all([
          getBranches(token),
          getPartners(token),
          getCategories(token),
          getWaiters(token),
          getManagers(token),
        ]);

        setBranches(branchesData.data);
        setPartners(partnersData);
        setCategories(categoriesData.data);
        setWaiter(waitersData.data);
        setManager(managersData.data);
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
  //console.log(branches);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setNoBranchesMessage("");
    if (category === "All Categories" || category === "") {
      setFilteredBranches(branches);
    } else {
      const categoryId = categories.find((cat) => cat.name === category)?.id;
      if (categoryId !== undefined) {
        const partnerIds = partners
          .filter(
            (partner) => categoryId === parseInt(partner.partner_category_id)
          )
          .map((partner) => partner.id);
        if (partnerIds.length > 0) {
          const filtered = branches.filter((branch) =>
            partnerIds.includes(parseInt(branch.partner_id))
          );
          if (filtered.length > 0) {
            setFilteredBranches(filtered);
          } else {
            setFilteredBranches([]);
            setNoBranchesMessage("No branches available under this category.");
          }
        } else {
          setFilteredBranches([]);
          setNoBranchesMessage("No branches available under this category.");
        }
      } else {
        setFilteredBranches([]);
        setNoBranchesMessage("No branches available under this category.");
      }
    }
  };

  const dropdownData = [
    {
      id: "0",
      category: "All Categories",
      image: "https://example.com/all.jpg",
    },
    ...categories.map((item, index) => ({
      id: `${index + 1}`,
      category: item.name,
      image: item.image, // Ensure your categories data includes the image URL
    })),
  ];

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification navigation={navigation} profile={profile} />
        </View>

        <View style={styles.dropdownCont}>
          <CustomDropdown
            data={dropdownData}
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
          />
          <SearchIcon
            navigateUrl={"BranchSearchScreen"}
            navigation={navigation}
            data={{ branches: branches, token: token }}
          />
        </View>

        {noBranchesMessage ? (
          <Text style={styles.noBranchesText}>{noBranchesMessage}</Text>
        ) : (
          <ScrollView style={{ marginBottom: 100 }}>
            {filteredBranches.length > 0
              ? filteredBranches.map((item, index) => (
                  <BranchCard
                    item={item}
                    key={index}
                    navigation={navigation}
                    partners={partners}
                    waiters={waiter}
                    categories={categories}
                    managers={manager}
                    token={token}
                    profile={profile}
                  />
                ))
              : branches.map((item, index) => (
                  <BranchCard
                    item={item}
                    key={index}
                    navigation={navigation}
                    partners={partners}
                    waiters={waiter}
                    categories={categories}
                    managers={manager}
                    token={token}
                    profile={profile}
                  />
                ))}
          </ScrollView>
        )}
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  dropdownCont: {
    borderWidth: 1,
    borderColor: "#383838",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginTop: -10,
  },
  noBranchesText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#acacad",
  },
});

export default Offers;
