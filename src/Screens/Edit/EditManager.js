import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import { golbalStyle } from "../../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../../components/Inputs/InputField";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import Alert from "../../components/Alert/Alert";
import * as FileSystem from "expo-file-system";
import StatusAlert from "../../components/Alert/StatusAlert";
import { getBranches, updateManager } from "../../apiService";

const EditManager = ({ navigation, route }) => {
  const token = route.params.data.token;
  const manager = route.params.data.manager;
  const prevBranch = route.params.data.branch;
  const [branch, setBranch] = useState(
    Array.isArray(prevBranch)
      ? []
      : {
          name: prevBranch.branch_name,
          image: prevBranch.image.url,
          id: prevBranch.id,
          desc: prevBranch.branch_description,
        }
  );
  const [name, setName] = useState(manager.manager_name);
  const [number, setNumber] = useState(manager.phone_number);
  const [address, setAddress] = useState(manager.address);
  const [fin, setFin] = useState(manager.fin);
  const [discount, setDiscount] = useState(manager.discount);
  const [dob, setDob] = useState(manager.death_of_birth);
  const [education, setEducation] = useState(manager.education);
  const [salary, setSalary] = useState(manager.salery);
  const [gardianInfo, setGardianInfo] = useState(manager.guardian_info);
  const [managerImg, setManagerImg] = useState(manager.image.url);

  const [showBranches, setShowBranches] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);
  const [activeManager, setActiveManager] = useState(
    manager.is_active == 1 ? true : false
  );
  const [allBranches, setAllBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchesData] = await Promise.all([getBranches(token)]);
        setAllBranches(branchesData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const branchDropdown = () => {
    setShowBranches((prevOpen) => !prevOpen);
    //setShowManager(false);
    //setShowDays(false);
  };

  const selectBranch = (item) => {
    setBranch(
      item
        ? {
            name: item.branch_name,
            image: item.image.url,
            id: item.id,
            desc: item.branch_description,
          }
        : []
    );
    setShowBranches(false);
  };
  const pickManagerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setManagerImg(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      let formattedBase64;

      if (managerImg.startsWith("http")) {
        const response = await fetch(managerImg);
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
        const imageBase64 = await FileSystem.readAsStringAsync(managerImg, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formattedBase64 = `data:image/png;base64,${imageBase64}`;
      }

      const formData = {
        manager_name: name,
        phone_number: number,
        address: address,
        fin: fin,
        discount: discount,
        guardian_info: gardianInfo,
        education: education,
        death_of_birth: dob,
        salery: salary,
        is_active: activeManager,
        branch_id: Array.isArray(branch) ? "0" : branch.id,
        image: formattedBase64,
      };

      const response = await updateManager(manager.id, formData, token);
      //console.log(response);
      if (response.ok) {
        console.log("Form data submitted successfully");
        setStatusAlert(true);
        setShowAlert(false);
      }
      if (response.status === 500) {
        console.log("Status 500!");
        setStatusAlert(true);
        setShowAlert(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigation.goBack();
  };

  const toggleSwitch = () =>
    setActiveManager((previousState) => !previousState);

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
            Edit Manager Details
          </Text>
        </View>
        {/* -------- Form Start ----- */}

        <View style={styles.form}>
          {/* branch */}
          <View>
            <InputField
              text={"Branch"}
              pickerFunction={branchDropdown}
              value={Array.isArray(branch) ? "No Branch" : branch}
              width={150}
              icon={() => (
                <>
                  <Entypo name="chevron-down" size={24} color="#acacad" />
                </>
              )}
            />
            {showBranches && (
              <ScrollView style={[styles.dropdown, { height: 230 }]}>
                <View
                  style={{
                    marginBottom: 15,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={[golbalStyle.row, styles.dropdownItem]}
                    onPress={() => selectBranch()}
                  >
                    <Text style={[golbalStyle.normalText, styles.dropText]}>
                      No Branch
                    </Text>
                  </TouchableOpacity>
                  {allBranches.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[golbalStyle.row, styles.dropdownItem]}
                      onPress={() => selectBranch(item)}
                    >
                      <Image src={item.image.url} style={styles.manImg} />
                      <Text style={[golbalStyle.normalText, styles.dropText]}>
                        {item.branch_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
          {/* Manager name */}
          <InputField
            placeholder={"Manager Name"}
            value={name}
            onChangeText={setName}
          />
          {/* Phone Number & Fin */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Phone number"}
              value={number}
              width={150}
              onChangeText={setNumber}
              icon={() => <AntDesign name="phone" size={20} color="#acacad" />}
            />
            <InputField
              placeholder={"Fin"}
              width={150}
              value={fin}
              onChangeText={setFin}
            />
          </View>
          {/* Discount & Dob */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Discount"}
              value={discount}
              width={150}
              onChangeText={setDiscount}
              icon={() => (
                <MaterialIcons name="discount" size={18} color="#acacad" />
              )}
            />
            <InputField
              placeholder={"DOB (yyyy-mm-dd)"}
              width={150}
              value={dob}
              onChangeText={setDob}
            />
          </View>
          {/* Education & Salery */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Education"}
              value={education}
              width={150}
              onChangeText={setEducation}
            />
            <InputField
              placeholder={"Salery"}
              width={150}
              value={salary}
              onChangeText={setSalary}
              icon={() => (
                <MaterialIcons name="attach-money" size={20} color="#acacad" />
              )}
            />
          </View>
          {/* Location */}
          <InputField
            placeholder={"Address"}
            value={address}
            onChangeText={setAddress}
            icon={() => <Entypo name="location" size={24} color="#acacad" />}
          />
          {/* Gaurdian Info */}
          <InputField
            placeholder={"Gaurdian Info"}
            value={gardianInfo}
            onChangeText={setGardianInfo}
          />
          {/* Image */}
          <InputField
            text={"Manager Image"}
            width={150}
            style={{ fontSize: 12 }}
            pickerFunction={pickManagerImage}
            icon={
              managerImg
                ? () => (
                    <TouchableOpacity onPress={pickManagerImage}>
                      <Image
                        source={{ uri: managerImg }}
                        style={styles.brandImage}
                      />
                    </TouchableOpacity>
                  )
                : () => (
                    <TouchableOpacity onPress={pickManagerImage}>
                      <Feather name="image" size={24} color="#acacad" />
                    </TouchableOpacity>
                  )
            }
          />
          {/* Active Branch */}
          <InputField
            text={"Active Manager"}
            pickerFunction={toggleSwitch}
            icon={() => (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={activeManager ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={activeManager}
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
              <Text style={styles.buttonText}>Update</Text>
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

export default EditManager;
