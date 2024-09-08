import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import { golbalStyle } from "../../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../../components/Inputs/InputField";
import { Feather } from "@expo/vector-icons";
import Alert from "../../components/Alert/Alert";
import * as FileSystem from "expo-file-system";
import StatusAlert from "../../components/Alert/StatusAlert";
import { createCategory } from "../../apiService";

const AddCategoryFormScreen = ({ navigation, route }) => {
  const token = route.params.token;
  const [name, setName] = useState("");
  const [CategoryImg, setCategoryImg] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);
  const [activeCategory, setActiveCategory] = useState(true);

  const pickCategoryImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setCategoryImg(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (name !== "" && CategoryImg) {
      try {
        const imageBase64 = await FileSystem.readAsStringAsync(CategoryImg, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const formattedBase64 = `data:image/png;base64,${imageBase64}`;
        const formData = {
          name: name,
          is_active: activeCategory,
          image: formattedBase64,
        };

        const response = await createCategory(formData, token);
        //  console.log(formData);

        if (response.ok) {
          console.log("Form data submitted successfully");
          setStatusAlert(true);
          setShowAlert(false);
          navigation.goBack();
        }
        if (response.status === 500) {
          setStatusAlert(true);
          setShowAlert(false);
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setShowAlert(true);
    }
  };

  const toggleSwitch = () =>
    setActiveCategory((previousState) => !previousState);

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
            Add Category Details
          </Text>
        </View>
        {/* -------- Form Start ----- */}

        <View style={styles.form}>
          {/* Category name */}
          <InputField
            placeholder={"Category Name"}
            value={name}
            onChangeText={setName}
          />

          {/* Image */}
          <InputField
            text={"Category Image"}
            width={150}
            style={{ fontSize: 12 }}
            pickerFunction={pickCategoryImage}
            icon={
              CategoryImg
                ? () => (
                    <TouchableOpacity onPress={pickCategoryImage}>
                      <Image
                        source={{ uri: CategoryImg }}
                        style={styles.brandImage}
                      />
                    </TouchableOpacity>
                  )
                : () => (
                    <TouchableOpacity onPress={pickCategoryImage}>
                      <Feather name="image" size={24} color="#acacad" />
                    </TouchableOpacity>
                  )
            }
          />
          {/* Active Branch */}
          <InputField
            text={"Active Category"}
            pickerFunction={toggleSwitch}
            icon={() => (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={activeCategory ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={activeCategory}
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
              <Text style={styles.buttonText}>Add Category</Text>
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

export default AddCategoryFormScreen;
