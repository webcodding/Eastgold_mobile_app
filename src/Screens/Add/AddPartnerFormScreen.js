import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import Alert from "../../components/Alert/Alert";
import * as FileSystem from "expo-file-system";
import Rating from "../../components/Rating";
import StatusAlert from "../../components/Alert/StatusAlert";
import { createPartner, getCategories } from "../../apiService";

const AddPartnerFormScreen = ({ navigation, route }) => {
  const [partnerName, setPartnerName] = useState("");
  const [partnerDes, setPartnerDes] = useState("");
  const [rating, setRating] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [partnerLocation, setPartnerLocation] = useState("");
  const [commotion, setCommotion] = useState("");
  const [website, setWebsite] = useState("");
  const [partnerImg, setPartnerImg] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [activePartner, setActivePartner] = useState(true);
  const [showOwner, setShowOwner] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const token = route.params.token;

  const allOwnerId = ["1"];

  const ownerDropdown = () => {
    setShowOwner((prevOpen) => !prevOpen);
    setShowCategory(false);
  };

  const categoryDropdown = () => {
    setShowCategory((prevOpen) => !prevOpen);
    setShowOwner(false);
  };

  const selectOwner = (item) => {
    setOwnerId(item);
    setShowOwner(false);
  };

  const selectCategory = (item) => {
    setCategory({ name: item.name, image: item.image.url, id: item.id });
    setShowCategory(false);
  };

  const toggleSwitch = () =>
    setActivePartner((previousState) => !previousState);

  const pickPartnerImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setPartnerImg(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData] = await Promise.all([getCategories(token)]);
        setAllCategories(categoriesData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async () => {
    if (partnerName !== "" && category && partnerImg && ownerId) {
      try {
        const imageBase64 = await FileSystem.readAsStringAsync(partnerImg, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const formattedBase64 = `data:image/png;base64,${imageBase64}`;
        const formData = {
          resturent_name: partnerName,
          desc: partnerDes,
          resturent_location: partnerLocation,
          rating: rating,
          work_time: workTime,
          partner_commotion: commotion,
          is_active: activePartner,
          website: website,
          owner_information_id: ownerId,
          partner_category_id: category.id,
          logo: formattedBase64,
        };

        const response = await createPartner(formData, token);

        if (response.ok) {
          console.log("Form data submitted successfully");
          setStatusAlert(true);
          setShowAlert(false);
        }
        if (response.status === 500) {
          setStatusAlert(true);
          setShowAlert(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setShowAlert(true);
    }
  };

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
            Add Partner Details
          </Text>
        </View>
        {/* -------- Form Start ----- */}
        <View style={styles.form}>
          {/* Partner name */}
          <InputField
            placeholder={"Partner Name"}
            value={partnerName}
            onChangeText={setPartnerName}
          />
          {/* Partner Desc */}
          <InputField
            placeholder={"Description"}
            value={partnerDes}
            onChangeText={setPartnerDes}
          />
          {/* Location */}
          <InputField
            placeholder={"Partner Location"}
            value={partnerLocation}
            onChangeText={setPartnerLocation}
            icon={() => <Entypo name="location" size={24} color="#acacad" />}
          />
          {/* Rating & Work Time */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Rating"}
              value={rating}
              onChangeText={setRating}
              width={150}
              icon={() => <Rating rating={rating} size={14} />}
            />
            <InputField
              placeholder={"Work Time (10:00:00)"}
              value={workTime}
              onChangeText={setWorkTime}
              width={150}
            />
          </View>
          {/* Commotion & Website */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <InputField
              placeholder={"Commotion"}
              value={commotion}
              onChangeText={setCommotion}
              width={150}
              icon={() => (
                <MaterialIcons name="percent" size={20} color="#c29555" />
              )}
            />
            <InputField
              placeholder={"Website"}
              value={website}
              onChangeText={setWebsite}
              width={150}
              icon={() => <Feather name="globe" size={24} color="#363636" />}
            />
          </View>
          {/* Owner Information & Category */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View>
              <InputField
                text={"Owner Information"}
                pickerFunction={ownerDropdown}
                value={ownerId}
                width={150}
                icon={() => (
                  <>
                    <Entypo name="chevron-down" size={24} color="#acacad" />
                  </>
                )}
              />
              {showOwner && (
                <ScrollView
                  style={[
                    styles.dropdown,
                    { height: "auto", paddingVertical: 5 },
                  ]}
                >
                  <View
                    style={{
                      marginBottom: 15,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    {allOwnerId.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          golbalStyle.row,
                          styles.dropdownItem,
                          {
                            width: 60,
                            flexDirection: "row",
                            justifyContent: "center",
                          },
                        ]}
                        onPress={() => selectOwner(item)}
                      >
                        <Text style={[golbalStyle.normalText, styles.dropText]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            <View>
              <InputField
                text={"Partner Categories"}
                pickerFunction={categoryDropdown}
                value={category}
                width={150}
                icon={() => (
                  <>
                    <Entypo name="chevron-down" size={24} color="#acacad" />
                  </>
                )}
              />
              {showCategory && (
                <ScrollView style={[styles.dropdown, { height: 230 }]}>
                  <View
                    style={{
                      marginBottom: 15,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    {allCategories.length > 0 &&
                      allCategories.map((item, index) => {
                        //console.log(item);
                        return (
                          <TouchableOpacity
                            key={index}
                            style={[golbalStyle.row, styles.dropdownItem]}
                            onPress={() => selectCategory(item)}
                          >
                            <Image src={item.image.url} style={styles.manImg} />
                            <Text
                              style={[golbalStyle.normalText, styles.dropText]}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
          {/* Logo */}
          <InputField
            text={"Partner Logo"}
            width={150}
            style={{ fontSize: 12 }}
            pickerFunction={pickPartnerImage}
            icon={
              partnerImg
                ? () => (
                    <TouchableOpacity onPress={pickPartnerImage}>
                      <Image
                        source={{ uri: partnerImg }}
                        style={styles.brandImage}
                      />
                    </TouchableOpacity>
                  )
                : () => (
                    <TouchableOpacity onPress={pickPartnerImage}>
                      <Feather name="image" size={24} color="#acacad" />
                    </TouchableOpacity>
                  )
            }
          />
          {/* Active Partner */}
          <InputField
            text={"Active Partner"}
            pickerFunction={toggleSwitch}
            icon={() => (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={activePartner ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={activePartner}
                style={{ marginTop: -12 }}
              />
            )}
          />

          {/* Add-partner-Button */}

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
              <Text style={styles.buttonText}>Add Partner</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* -------- Form End ----- */}
      </View>
      {showAlert && (
        <Alert
          text={"Please fill name, category and image fields!"}
          style={{ color: "#fff" }}
          setShowAlert={() => setShowAlert(false)}
        />
      )}
      {statusAlert && (
        <StatusAlert
          status={"ok"}
          text={"Successfully Added!"}
          setShowAlert={() => setStatusAlert(false)}
        />
      )}
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 25,
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

export default AddPartnerFormScreen;
