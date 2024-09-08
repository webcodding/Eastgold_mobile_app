import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import { golbalStyle } from "../../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../../components/Inputs/InputField";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import Alert from "../../components/Alert/Alert";
import * as FileSystem from "expo-file-system";
import StatusAlert from "../../components/Alert/StatusAlert";
import { createBranch, getManagers } from "../../apiService";

const AddBranchFormScreen = ({ navigation, route }) => {
  const allPartners = route.params.partners;
  const token = route.params.token;

  const [allmanagers, setAllManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [partner, setPartner] = useState(null);
  const [branchName, setBranchName] = useState("");
  const [branchDes, setBranchDes] = useState("");
  const [phone, setPhone] = useState("");
  const [branchLocation, setBranchLocation] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [workEnd, setWorkEnd] = useState("");
  const [manager, setManager] = useState(null);
  const [branchDiscount, setBranchDiscount] = useState("");
  const [marketDiscount, setMarketDiscount] = useState("");
  const [customerGold, setCustomerGold] = useState("");
  const [waiterGold, setWaiterGold] = useState("");
  const [branchImg, setBranchImg] = useState(null);
  const [activeBranch, setActiveBranch] = useState(true);
  const [showManager, setShowManager] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const allDays = [
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [managerData] = await Promise.all([getManagers(token)]);
        setAllManagers(managerData.data);
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

  const pickBranchImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setBranchImg(result.assets[0].uri);
    }
  };
  const dayDropdown = () => {
    setShowDays((prevOpen) => !prevOpen);
    setShowManager(false);
    setShowPartner(false);
  };
  const managerDropdown = () => {
    setShowManager((prevOpen) => !prevOpen);
    setShowDays(false);
    setShowPartner(false);
  };
  const partnerDropdown = () => {
    setShowPartner((prevOpen) => !prevOpen);
    setShowManager(false);
    setShowDays(false);
  };

  const selectManager = (item) => {
    setManager({ id: item.id, image: item.image.url, name: item.manager_name });
    setShowManager(false);
  };
  const selectPartner = (item) => {
    setPartner({
      image: item.logo.url,
      name: item.resturent_name,
      id: item.id,
      location: item.resturent_location,
      category_Id: item.partner_category_id,
      commotion: item.partner_commotion,
      rating: item.rating,
    });
    setShowPartner(false);
  };

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const renderDayCheckboxes = () => {
    return allDays.map((day, index) => (
      <TouchableOpacity
        key={index}
        style={[golbalStyle.row, styles.dropdownItem]}
        onPress={() => toggleDaySelection(day)}
      >
        {selectedDays.includes(day) ? (
          <FontAwesome
            name="check-square-o"
            size={24}
            color="#c29555"
            style={{ marginRight: 5 }}
          />
        ) : (
          <FontAwesome
            name="square-o"
            size={24}
            color="#c29555"
            style={{ marginRight: 5 }}
          />
        )}
        <Text
          style={[golbalStyle.normalText, styles.dropText, { marginLeft: 4 }]}
        >
          {day}
        </Text>
      </TouchableOpacity>
    ));
  };

  const handleSubmit = async () => {
    if (
      partner &&
      manager &&
      branchImg &&
      branchName !== "" &&
      phone !== "" &&
      branchLocation !== "" &&
      workStart !== "" &&
      workEnd !== "" &&
      branchDiscount !== "" &&
      marketDiscount !== "" &&
      customerGold !== "" &&
      waiterGold !== ""
    ) {
      try {
        // Convert image to base64
        const imageBase64 = await FileSystem.readAsStringAsync(branchImg, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const formattedBase64 = `data:image/png;base64,${imageBase64}`;

        const formData = {
          partner_id: partner.id ? partner.id : "",
          branch_name: branchName,
          branch_description: branchDes,
          phone_number: phone,
          location: branchLocation,
          work_start_time: workStart,
          work_end_time: workEnd,
          general_manager: manager.name ? manager.name : "",
          branch_discount: branchDiscount,
          marketing_discount: marketDiscount,
          customer_gold_back: customerGold,
          waiter_gold_back: waiterGold,
          is_active: activeBranch,
          image: formattedBase64, // Send the base64-encoded image
        };

        const response = await createBranch(formData, token);
        if (response.ok) {
          console.log("Form data submitted successfully");
          //  console.log(formData);
          setStatusAlert(true);
          setShowAlert(false);
          navigation.goBack();
        } else {
          console.error("Failed to submit form data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Form data validation failed");
      setShowAlert(true);
    }
  };

  const toggleSwitch = () => setActiveBranch((previousState) => !previousState);

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <Text
            style={[golbalStyle.normalText, { color: "#c29555", fontSize: 18 }]}
          >
            {" "}
            Add Branch Details
          </Text>
        </View>
        {/* -------- Form Start ----- */}

        <View style={styles.form}>
          {/* Branch name */}
          <InputField
            placeholder={"Branch Name"}
            value={branchName}
            onChangeText={setBranchName}
          />
          {/* Branch Desc */}
          <InputField
            placeholder={"Branch Description"}
            value={branchDes}
            onChangeText={setBranchDes}
          />
          {/* Phone Number & Image */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Phone Number"}
              value={phone}
              onChangeText={setPhone}
              width={150}
            />
            <InputField
              text={"Branch Image"}
              width={150}
              style={{ fontSize: 12 }}
              pickerFunction={pickBranchImage}
              icon={
                branchImg
                  ? () => (
                      <TouchableOpacity onPress={pickBranchImage}>
                        <Image
                          source={{ uri: branchImg }}
                          style={styles.brandImage}
                        />
                      </TouchableOpacity>
                    )
                  : () => (
                      <TouchableOpacity onPress={pickBranchImage}>
                        <Feather name="image" size={24} color="#acacad" />
                      </TouchableOpacity>
                    )
              }
            />
          </View>
          {/* Location */}
          <InputField
            placeholder={"Branch Location"}
            value={branchLocation}
            onChangeText={setBranchLocation}
            icon={() => <Entypo name="location" size={24} color="#acacad" />}
          />
          {/* Work Start & End Time */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Work Start (10:00:00)"}
              value={workStart}
              onChangeText={setWorkStart}
              width={150}
            />
            <InputField
              placeholder={"Work End (10:00:00)"}
              value={workEnd}
              onChangeText={setWorkEnd}
              width={150}
            />
          </View>

          {/* Branch Discount & Marketing Discount */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Branch Discount"}
              width={150}
              style={{ fontSize: 12 }}
              value={branchDiscount}
              onChangeText={setBranchDiscount}
              icon={() => (
                <MaterialIcons name="discount" size={18} color="#acacad" />
              )}
            />
            <InputField
              placeholder={"Marketing Discount"}
              width={150}
              style={{ fontSize: 12 }}
              value={marketDiscount}
              onChangeText={setMarketDiscount}
              icon={() => (
                <MaterialIcons name="discount" size={18} color="#acacad" />
              )}
            />
          </View>
          {/* Customer-gold-back & waiter-gold-back */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Customer gold"}
              value={customerGold}
              onChangeText={setCustomerGold}
              width={150}
              style={{ fontSize: 12 }}
              icon={() => (
                <FontAwesome6 name="coins" size={20} color="#c29555" />
              )}
            />
            <InputField
              placeholder={"Waiter Gold"}
              value={waiterGold}
              onChangeText={setWaiterGold}
              width={150}
              style={{ fontSize: 12 }}
              icon={() => (
                <FontAwesome6 name="coins" size={20} color="#c29555" />
              )}
            />
          </View>

          {/* partner & General Manager */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View>
              <InputField
                text={"Add Partner"}
                pickerFunction={partnerDropdown}
                value={partner}
                width={150}
                icon={() => (
                  <>
                    <Entypo name="chevron-down" size={24} color="#acacad" />
                  </>
                )}
              />
              {showPartner && (
                <ScrollView style={[styles.dropdown, { height: 230 }]}>
                  <View
                    style={{
                      marginBottom: 15,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    {allPartners.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[golbalStyle.row, styles.dropdownItem]}
                        onPress={() => selectPartner(item)}
                      >
                        <Image src={item.logo.url} style={styles.manImg} />
                        <Text style={[golbalStyle.normalText, styles.dropText]}>
                          {item.resturent_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            <View>
              <InputField
                text={"General Manager"}
                pickerFunction={managerDropdown}
                value={manager}
                width={150}
                icon={() => (
                  <Entypo name="chevron-down" size={24} color="#acacad" />
                )}
              />
              {showManager && (
                <ScrollView style={[styles.dropdown, { height: 230 }]}>
                  <View
                    style={{
                      marginBottom: 15,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    {allmanagers.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[golbalStyle.row, styles.dropdownItem]}
                        onPress={() => selectManager(item)}
                      >
                        <Image src={item.image.url} style={styles.manImg} />
                        <Text style={[golbalStyle.normalText, styles.dropText]}>
                          {item.manager_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
          {/* Days */}
          <View>
            <InputField
              text={"Select Days"}
              value={selectedDays.join(", ")}
              pickerFunction={dayDropdown}
              icon={() => (
                <Entypo name="chevron-down" size={24} color="#acacad" />
              )}
            />
            {showDays && (
              <ScrollView style={[styles.dropdown]}>
                <View
                  style={{
                    marginBottom: 15,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  {renderDayCheckboxes()}
                </View>
              </ScrollView>
            )}
          </View>

          {/* Active Branch */}
          <InputField
            text={"Active Branch"}
            pickerFunction={toggleSwitch}
            icon={() => (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={activeBranch ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={activeBranch}
                style={{ marginTop: -12 }}
              />
            )}
          />
          {/*  Add Button */}
          <TouchableOpacity
            style={styles.borderContainer}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={["#7a5c01", "#d49d1e", "#a17903"]}
              style={styles.btnContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.3, y: 0.5 }}
            >
              <Text style={styles.buttonText}>Add Branch</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* -------- Form End ----- */}
      </View>
      {showAlert && (
        <Alert
          text={"Please fill all the fields!"}
          style={{ color: "#fff" }}
          setShowAlert={() => setShowAlert(false)}
        />
      )}
      {statusAlert && (
        <StatusAlert
          status={"ok"}
          text={"Successfully Added!"}
          setShowAlert={() => setStatusAlert(false)}
          style={{ marginVertical: 10 }}
        />
      )}
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 5,
  },
  brandImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    opacity: 0.8,
    marginTop: -5,
    //objectFit: "contain",
  },
  btnContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0,

    borderRadius: 5,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: "#c29555",
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  dropdown: {
    backgroundColor: "#282829",
    padding: 10,
    paddingRight: 20,
    borderRadius: 5,
    position: "absolute",
    top: 60,
    left: 5,
    zIndex: 30,
    height: 260,
    paddingVertical: 20,
    // width: 160,
    marginBottom: 20,
  },
  dropdownItem: {
    marginVertical: 15,
  },
  dropText: {
    opacity: 0.6,
  },
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 25,
    height: 25,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  catImg: {
    width: 22,
    height: 22,
    borderRadius: 50,
  },
  manImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
});

export default AddBranchFormScreen;
