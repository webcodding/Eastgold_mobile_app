import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "./style";
import FirstScreen from "./FirstScreen";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";
import LayoutWrapper from "../../components/LayoutWrapper";
import { golbalStyle } from "../../GlobalStyles";
import ChangeLang from "../../components/language/ChangeLang";
import { logout } from "../Login/LogoutFunction";

const WelcomeScreen = ({ navigation }) => {
  const [secondScreen, setSecondScreen] = useState(false);
  const [thirdScreen, setThirdScreen] = useState(false);

  const [screenIndex, setScreenIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handleLogout = () => logout(navigation);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, [screenIndex, fadeAnim]);

  const handleSkipButton = async () => {
    if (screenIndex < 2) {
      setScreenIndex(screenIndex + 1);
    } else {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user_type");
      await AsyncStorage.removeItem("user");
      navigation.navigate("Login");
    }
  };

  // Function to render the appropriate screen based on the screenIndex state
  const renderScreen = () => {
    switch (screenIndex) {
      case 1:
        return (
          <Animated.View style={{ opacity: fadeAnim }}>
            <SecondScreen />
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View style={{ opacity: fadeAnim }}>
            <ThirdScreen />
          </Animated.View>
        );
      default:
        return (
          <Animated.View style={{ opacity: fadeAnim }}>
            <FirstScreen />
          </Animated.View>
        );
    }
  };

  return (
    <LayoutWrapper>
      <View
        style={[
          {
            //justifyContent: "flex-end",
            position: "absolute",
            top: 50,
            right: 70,
            zIndex: 60,
          },
        ]}
      >
        <ChangeLang />
      </View>
      {renderScreen()}
      {/* <Text style={[golbalStyle.normalText]} onPress={handleLogout}>
        Logout
      </Text> */}
      <View style={styles.bottomContent}>
        <View style={styles.iconsContainer}>
          <Entypo
            name="dot-single"
            style={screenIndex === 0 ? styles.bigIcon : styles.icon}
          />
          <Entypo
            name="dot-single"
            style={screenIndex === 1 ? styles.bigIcon : styles.icon}
          />
          <Entypo
            name="dot-single"
            style={screenIndex === 2 ? styles.bigIcon : styles.icon}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkipButton}>
            <LinearGradient
              colors={["#d1a669", "#c29555", "#a37739"]}
              style={styles.arrowBtnContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.3, y: 0.5 }}
            >
              <FontAwesome6 name="arrow-right-long" style={styles.arrowBtn} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutWrapper>
  );
};

export default WelcomeScreen;
