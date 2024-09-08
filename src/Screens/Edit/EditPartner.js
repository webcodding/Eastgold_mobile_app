import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
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
import { getCategories, updatePartner } from "../../apiService";

const EditPartner = ({ navigation, route }) => {
  const token = route.params.data.token;
  const partner = route.params.data.partner;
  const prevCategory = route.params.data.category;
  const [partnerName, setPartnerName] = useState(partner.resturent_name);
  const [partnerDes, setPartnerDes] = useState(partner.desc);
  const [rating, setRating] = useState(partner.rating);
  const [workTime, setWorkTime] = useState(partner.work_time);
  const [partnerLocation, setPartnerLocation] = useState(
    partner.resturent_location
  );
  const [commotion, setCommotion] = useState(partner.partner_commotion);
  const [website, setWebsite] = useState(partner.website);
  const [partnerImg, setPartnerImg] = useState(partner.logo.url);
  const [ownerId, setOwnerId] = useState(null);
  const [category, setCategory] = useState({
    name: prevCategory.name,
    image: prevCategory.image.url,
    id: prevCategory.id,
  });
  const [allCategories, setAllCategories] = useState([]);
  const [activePartner, setActivePartner] = useState(
    partner.is_active == 1 ? true : false
  );
  const [showOwner, setShowOwner] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const categoryDropdown = () => {
    setShowCategory((prevOpen) => !prevOpen);
    setShowOwner(false);
  };
  //console.log(prevCategory);

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
        const [categoryData] = await Promise.all([getCategories(token)]);
        setAllCategories(categoryData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    let formattedBase64;

    if (partnerImg.startsWith("http")) {
      const response = await fetch(partnerImg);
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
      const imageBase64 = await FileSystem.readAsStringAsync(partnerImg, {
        encoding: FileSystem.EncodingType.Base64,
      });
      formattedBase64 = `data:image/png;base64,${imageBase64}`;
    }

    try {
      const formData = {
        resturent_name: partnerName,
        desc: partnerDes,
        resturent_location: partnerLocation,
        rating: rating,
        work_time: workTime,
        partner_commotion: commotion,
        is_active: activePartner,
        website: website,
        partner_category_id: category.id,
        logo: formattedBase64,
      };

      const response = await updatePartner(partner.id, formData, token);

      if (response.ok) {
        console.log("Form data submitted successfully");
        setStatusAlert(true);
        setShowAlert(false);
      }
      if (response.status === 500) {
        console.log("status 500");
        setStatusAlert(true);
        setShowAlert(false);
      }
    } catch (error) {
      console.error("Error:", error);
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
            Edit Partner Details
          </Text>
        </View>
        {/* ---- Main ------ */}
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

          <View>
            <InputField
              text={"Partner Categories"}
              pickerFunction={categoryDropdown}
              value={category}
              // width={150}
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
                      <Image src={partnerImg} style={styles.brandImage} />
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
              <Text style={styles.buttonText}>Update</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/*------------- */}
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
          text={"Successfully Updated!"}
          setShowAlert={() => setStatusAlert(false)}
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

export default EditPartner;
