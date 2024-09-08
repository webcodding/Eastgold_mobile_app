import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import { golbalStyle } from "../../GlobalStyles";
import Alert from "../../components/Alert/Alert";
import StatusAlert from "../../components/Alert/StatusAlert";
import InputField from "../../components/Inputs/InputField";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { getManagers, updateBranch } from "../../apiService";

const EditBranch = ({ route }) => {
  const branch = route.params.data.branch;
  const token = route.params.data.token;
  const prevManager = route.params.data.manager;
  const prevPartner = route.params.data.partner;
  const [allmanagers, setAllManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [partner, setPartner] = useState(
    prevPartner
      ? {
          name: prevPartner.resturent_name,
          id: prevPartner.id,
          image: prevPartner.logo.url,
        }
      : null
  );
  const [branchName, setBranchName] = useState(branch.branch_name);
  const [branchDes, setBranchDes] = useState(branch.branch_description);
  const [phone, setPhone] = useState(branch.phone_number);
  const [branchLocation, setBranchLocation] = useState(branch.location);
  const [workStart, setWorkStart] = useState(branch.work_start_time);
  const [workEnd, setWorkEnd] = useState(branch.work_end_time);
  const [manager, setManager] = useState(
    prevManager
      ? {
          name: prevManager.manager_name,
          id: prevManager.id,
          image: prevManager.image.url,
        }
      : null
  );
  const [branchDiscount, setBranchDiscount] = useState(branch.branch_discount);
  const [marketDiscount, setMarketDiscount] = useState(
    branch.marketing_discount
  );
  const [customerGold, setCustomerGold] = useState(branch.customer_gold_back);
  const [waiterGold, setWaiterGold] = useState(branch.waiter_gold_back);
  const [branchImg, setBranchImg] = useState(branch.image.url);
  const [activeBranch, setActiveBranch] = useState(
    branch.is_active == 1 ? true : false
  );
  const [showManager, setShowManager] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [managersData] = await Promise.all([getManagers(token)]);
        setAllManagers(managersData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
  const managerDropdown = () => {
    setShowManager((prevOpen) => !prevOpen);
  };
  const selectManager = (item) => {
    setManager({ id: item.id, image: item.image.url, name: item.manager_name });
    setShowManager(false);
  };
  const handleSubmit = async () => {
    try {
      let formattedBase64;

      if (branchImg.startsWith("http")) {
        const response = await fetch(branchImg);
        const blob = await response.blob();
        const reader = new FileReader();

        formattedBase64 = await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64String = reader.result;
            resolve(
              base64String.startsWith("data:")
                ? base64String
                : `data:image/png;base64,${base64String}`
            );
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } else {
        const imageBase64 = await FileSystem.readAsStringAsync(branchImg, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formattedBase64 = `data:image/png;base64,${imageBase64}`;
      }

      const formData = {
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
        image: formattedBase64,
      };
      //console.log(branch.id);

      const response = await updateBranch(branch.id, formData, token);
      if (response.ok) {
        console.log("Form data submitted successfully");
        //  console.log(formData);
        setStatusAlert(true);
        setShowAlert(false);
      } else {
        // console.error("Failed to submit form data");
        setStatusAlert(true);
      }
    } catch (error) {
      console.error("Error:", error);
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
            Edit Branch Details
          </Text>
        </View>
        {/* ---- Main ---- */}
        <View style={styles.form}>
          {/* Branch name */}
          <Text style={[golbalStyle.normalText, styles.title]}>
            Branch Name
          </Text>
          <InputField
            placeholder={"Branch Name"}
            value={branchName}
            onChangeText={setBranchName}
          />
          {/* Branch Desc */}
          <Text style={[golbalStyle.normalText, styles.title]}>
            Branch Desc
          </Text>
          <InputField
            placeholder={"Branch Description"}
            value={branchDes}
            onChangeText={setBranchDes}
          />
          {/* Phone Number & Image */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Phone Number
              </Text>
              <InputField
                placeholder={"Phone Number"}
                value={phone}
                onChangeText={setPhone}
                width={150}
              />
            </View>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Branch Image
              </Text>
              <InputField
                text={"Select"}
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
          </View>
          {/* Location */}
          <Text style={[golbalStyle.normalText, styles.title]}>Location</Text>
          <InputField
            placeholder={"Branch Location"}
            value={branchLocation}
            onChangeText={setBranchLocation}
            icon={() => <Entypo name="location" size={24} color="#acacad" />}
          />
          {/* Work Start & End Time */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Work start time
              </Text>
              <InputField
                placeholder={"Work Start (10:00:00)"}
                value={workStart}
                onChangeText={setWorkStart}
                width={150}
              />
            </View>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Work end time
              </Text>
              <InputField
                placeholder={"Work End (10:00:00)"}
                value={workEnd}
                onChangeText={setWorkEnd}
                width={150}
              />
            </View>
          </View>

          {/* Branch Discount & Marketing Discount */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Branch Discount
              </Text>
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
            </View>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Marketing Discount
              </Text>
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
          </View>
          {/* Customer-gold-back & waiter-gold-back */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Customer gold
              </Text>
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
            </View>
            <View style={[golbalStyle.column]}>
              <Text style={[golbalStyle.normalText, styles.title]}>
                Waiter gold
              </Text>
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
          </View>

          {/* General Manager */}
          <View>
            <Text style={[golbalStyle.normalText, styles.title]}>
              General manager
            </Text>
            <InputField
              text={"Add General Manager"}
              pickerFunction={managerDropdown}
              value={manager}
              // width={150}
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
          {/*  Update Button */}
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
              <Text style={styles.buttonText}>Update</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* --------- */}
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
          text={"Successfully Updated!"}
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
    marginTop: 20,
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
  title: {
    fontSize: 10,
    color: "#acacad",
    marginBottom: -4,
    marginLeft: 3,
  },
});

export default EditBranch;
