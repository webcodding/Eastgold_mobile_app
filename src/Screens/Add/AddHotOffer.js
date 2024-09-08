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
  ActivityIndicator,
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
import { createHotOffer, getBranches } from "../../apiService";

const AddHotOfferFormScreen = ({ navigation, route }) => {
  const token = route.params.token;
  const [allBranches, setAllBranches] = useState([]);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [gold_offer, setGoldOffer] = useState("");
  const [OfferImg, setOfferImg] = useState(null);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [showBranches, setShowBranches] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);
  const [activeOffer, setactiveOffer] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchesData] = await Promise.all([getBranches(token)]);
        setAllBranches(branchesData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const pickOfferImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setOfferImg(result.assets[0].uri);
    }
  };

  const branchDropdown = () => {
    setShowBranches((prevOpen) => !prevOpen);
  };

  const toggleBranchSelection = (branch) => {
    if (selectedBranches.includes(branch)) {
      setSelectedBranches(
        selectedBranches.filter((selectedBranch) => selectedBranch !== branch)
      );
    } else {
      setSelectedBranches([...selectedBranches, branch]);
    }
  };

  const renderBranchCheckboxes = () => {
    return allBranches.map((day, index) => (
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
    if (name !== "" && OfferImg && discount !== "" && gold_offer !== "") {
      try {
        // Convert image to base64
        const imageBase64 = await FileSystem.readAsStringAsync(OfferImg, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const formattedBase64 = `data:image/png;base64,${imageBase64}`;
        // const newImageUri = "file:///" + branchImg.split("file:/").join("");

        const formData = {
          offer_name: name,
          discount: discount,
          gold_offer: gold_offer,
          is_active: activeOffer,
          image: formattedBase64,
        };

        const response = await createHotOffer(formData, token);
        if (response.ok) {
          console.log("Form data submitted successfully");
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

  const toggleSwitch = () => setactiveOffer((previousState) => !previousState);

  if (loading) {
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
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <Text
            style={[golbalStyle.normalText, { color: "#c29555", fontSize: 18 }]}
          >
            {" "}
            Add Hot Offer Details
          </Text>
        </View>
        {/* -------- Form Start ----- */}

        <View style={styles.form}>
          {/* Category name */}
          <InputField
            placeholder={"Offer Name"}
            value={name}
            onChangeText={setName}
          />
          {/* Discount */}
          <InputField
            placeholder={"Discount"}
            value={discount}
            onChangeText={setDiscount}
          />
          {/* Gold_offer */}
          <InputField
            placeholder={"Gold Offer"}
            value={gold_offer}
            onChangeText={setGoldOffer}
          />

          {/* Image */}
          <InputField
            text={"Offer Image"}
            width={150}
            style={{ fontSize: 12 }}
            pickerFunction={pickOfferImage}
            icon={
              OfferImg
                ? () => (
                    <TouchableOpacity onPress={pickOfferImage}>
                      <Image
                        source={{ uri: OfferImg }}
                        style={styles.brandImage}
                      />
                    </TouchableOpacity>
                  )
                : () => (
                    <TouchableOpacity onPress={pickOfferImage}>
                      <Feather name="image" size={24} color="#acacad" />
                    </TouchableOpacity>
                  )
            }
          />
          {/* Active Branch */}
          <InputField
            text={"Active Offer"}
            pickerFunction={toggleSwitch}
            icon={() => (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={activeOffer ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={activeOffer}
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
              <Text style={styles.buttonText}>Add Hot Offer</Text>
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

export default AddHotOfferFormScreen;
