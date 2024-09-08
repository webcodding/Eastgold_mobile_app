import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import ProfileSettingModal from "../../components/Modal/ProfileSettingModal";
import InputField from "../../components/Inputs/InputField";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button/Button";
import LanguageDropdown from "../../components/dropdown/LanguageDropdown";

const SettingProfile = ({ route, navigation }) => {
  const profile = route.params.profile;
  //console.log(profile);

  const [accountType, setAccountType] = useState(profile.user_type);
  // const [location, setLocation] = useState(profile.location);
  const [profileImg, setProfileImg] = useState(profile.image.url);
  const [email, setEmail] = useState(profile.email);
  const [number, setNumber] = useState(profile.phone);
  const [name, setName] = useState(profile.name);
  const [allowNotification, setAllowNotifcation] = useState(true);
  const [language, setLanguage] = useState("English");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [newText, setNewText] = useState("");

  const handleOpenModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
    setModalContent(
      <InputField
        placeholder="Email"
        value={newEmail}
        onChangeText={handleEmailChange}
      />
    );
    setNewText("Email");
  };

  const handleNumberChange = (newNumber) => {
    setNumber(newNumber);
    setModalContent(
      <InputField
        placeholder="Mobile number"
        value={newNumber}
        onChangeText={handleNumberChange}
      />
    );
    setNewText("Mobile Number");
  };

  const handleNameChange = (newName) => {
    setName(newName);
    setModalContent(
      <InputField
        placeholder="Name"
        value={newName}
        onChangeText={handleNameChange}
      />
    );
    setNewText("Name");
  };
  const handleLanguageChange = (lang) => {
    setNewText("Language");
    setLanguage(lang);
    setModalContent(
      <LanguageDropdown
        selectedLanguage={language}
        onValueChange={handleLanguageChange}
      />
    );
  };

  const pickBranchImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
      setModalContent(
        <TouchableOpacity onPress={pickBranchImage}>
          <Image
            src={result.assets[0].uri}
            style={[
              styles.profileImg,
              { width: 60, height: 60, marginTop: 20 },
            ]}
          />
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    if (newText === "Language") {
      setModalContent(
        <LanguageDropdown
          selectedLanguage={language}
          onValueChange={handleLanguageChange}
        />
      );
    }
  }, [language]);

  const toggleSwitch = () =>
    setAllowNotifcation((previousState) => !previousState);

  return (
    <LayoutWrapper>
      <View style={styles.container}>
        <View style={[styles.head]}>
          <PrevArrowButton />
        </View>
        <View style={[golbalStyle.row, { justifyContent: "center" }]}>
          <Text style={[golbalStyle.normalText, styles.heading]}>Account</Text>
          <SimpleLineIcons
            name="settings"
            size={22}
            color="#fff"
            style={{ opacity: 1, marginLeft: 5 }}
          />
        </View>
        {/*-- Setting Contents -- */}
        <View style={[styles.menu]}>
          {/* Account Type */}
          <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Account type</Text>
            <View style={[golbalStyle.row]}>
              <Text
                style={[
                  golbalStyle.normalText,
                  { fontSize: 16, textTransform: "capitalize", opacity: 0.6 },
                ]}
              >
                {accountType}
              </Text>
            </View>
          </View>
          {/* Location */}
          {/* <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Location</Text>
            <View style={[golbalStyle.row]}>
              <Text style={[golbalStyle.normalText, styles.rightText]}>
                {location}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </View>
          </View> */}
          {/* Profile Img */}
          <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Profile picture</Text>
            <TouchableOpacity
              style={[golbalStyle.row]}
              onPress={() => {
                setNewText("Profile Picture");
                handleOpenModal(
                  <TouchableOpacity onPress={pickBranchImage}>
                    <Image
                      src={profileImg}
                      style={[
                        styles.profileImg,
                        { width: 60, height: 60, marginTop: 20 },
                      ]}
                    />
                  </TouchableOpacity>
                );
              }}
            >
              {profile.image ? (
                <Image src={profileImg} style={styles.profileImg} />
              ) : (
                <MaterialIcons
                  name="account-circle"
                  size={40}
                  color="#acacad"
                />
              )}

              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
          {/* Email */}
          <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Email</Text>
            <TouchableOpacity
              style={[golbalStyle.row]}
              onPress={() => {
                setNewText("Email");
                handleOpenModal(
                  <>
                    <InputField
                      placeholder="Email"
                      value={email}
                      onChangeText={handleEmailChange}
                    />
                  </>
                );
              }}
            >
              <Text style={[golbalStyle.normalText, styles.rightText]}>
                {email}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
          {/* Mobile Number */}
          <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Mobile number</Text>
            <TouchableOpacity
              style={[golbalStyle.row]}
              onPress={() => {
                setNewText("Mobile Number");
                handleOpenModal(
                  <InputField
                    placeholder="Mobile Number"
                    value={number}
                    onChangeText={handleNumberChange}
                  />
                );
              }}
            >
              <Text style={[golbalStyle.normalText, styles.rightText]}>
                {number}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
          {/* Name */}
          <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Name</Text>
            <TouchableOpacity
              style={[golbalStyle.row]}
              onPress={() => {
                setNewText("Name");
                handleOpenModal(
                  <InputField
                    placeholder="Name"
                    value={name}
                    onChangeText={handleNameChange}
                  />
                );
              }}
            >
              <Text style={[golbalStyle.normalText, styles.rightText]}>
                {name}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
          {/* Delete Account */}
          <TouchableOpacity
            style={[golbalStyle.row, styles.menuItem]}
            onPress={() => {
              setNewText("Delete Account");
              handleOpenModal(
                <>
                  <Text
                    style={[
                      golbalStyle.normalText,
                      { fontSize: 17, textAlign: "center" },
                    ]}
                  >
                    Do you want to delete your account permanently?
                  </Text>
                </>
              );
            }}
          >
            <Text style={[golbalStyle.normalText]}>Delete account</Text>
            <View style={[golbalStyle.row]}>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </View>
          </TouchableOpacity>

          {/* Allow notification */}
          <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Allow notification</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={allowNotification ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={allowNotification}
              style={{ marginTop: -12 }}
            />
          </View>
          {/* Language*/}
          <View style={[golbalStyle.row, styles.menuItem]}>
            <Text style={[golbalStyle.normalText]}>Language</Text>
            <TouchableOpacity
              style={[golbalStyle.row]}
              onPress={() => {
                setNewText("Language");
                handleOpenModal(
                  <LanguageDropdown
                    selectedLanguage={language}
                    onValueChange={handleLanguageChange}
                  />
                );
              }}
            >
              <Text style={[golbalStyle.normalText, styles.rightText]}>
                {language}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
          {/* Sign out */}
          <TouchableOpacity
            style={[golbalStyle.row, styles.menuItem]}
            onPress={() => {
              setNewText("Sign out");
              handleOpenModal(
                <>
                  <Text
                    style={[
                      golbalStyle.normalText,
                      { fontSize: 17, textAlign: "center" },
                    ]}
                  >
                    Do you want to sign out?
                  </Text>
                </>
              );
            }}
          >
            <Text style={[golbalStyle.normalText]}>Sign out</Text>
            <View style={[golbalStyle.row]}>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.arrowRight}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ProfileSettingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        content={modalContent}
        text={newText}
        setModalVisible={setModalVisible}
      />
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  head: {
    marginTop: 50,
    justifyContent: "flex-start",
  },
  heading: {
    //marginLeft: 15,
    fontSize: 23,
    fontFamily: "Nunito_Bold",
  },
  menuItem: {
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#383838",
    paddingLeft: 4,
  },
  arrowRight: {
    opacity: 0.6,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 5,
  },
  rightText: {
    color: "#c29555",
    opacity: 0.9,
  },
});

export default SettingProfile;
