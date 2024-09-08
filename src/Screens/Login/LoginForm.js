// import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import OtpScreen from "./OTPscreen";
import Alert from "../../components/Alert/Alert";
import StatusAlert from "../../components/Alert/StatusAlert";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "./LogoutFunction";

// create a component
const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("0");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectPartner, setSelectPartner] = useState(null);
  const [partnerValue, setPartnerValue] = useState(null);
  const [partnerIsFocus, setPartnerIsFocus] = useState(null);
  const [number, setNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    const getCountryData = async () => {
      const reqData = await fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
      return reqData;
    };
    getCountryData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // Set default value if data is available
      setValue("0"); // Default to the first item in dropdownData
      setSelectedItem(dropdownData[0]?.custom);
    }
    setPartnerValue("MMTC PAMP");
    setSelectPartner("MMTC PAMP");
  }, [data]);

  useEffect(() => {
    setAlert(false);
  }, [number]);

  const handleTextInputChange = (inputValue) => {
    setNumber(inputValue);
    if (inputValue.length > 7) {
      setIsButtonDisabled(false); // Enable button if input length is 10
    } else {
      setAlert(false);
      setIsButtonDisabled(true); // Disable button if input length is not 10
    }
  };

  const callCode =
    data.length > 0
      ? data
          .sort((a, b) =>
            a.name.common.localeCompare(b.name.common, "en", {
              sensitivity: "base",
            })
          )
          .map((item) => {
            const suffix = item.idd?.suffixes?.[0];
            const code = item.idd.root + (suffix || "");
            const flagUrl = item.flags.png;

            return { flagUrl: flagUrl, code: code };
          })
      : [];

  const dropdownData = callCode.map((item, index) => {
    return {
      label: item.code,
      value: index.toString(),
      custom: item,
    };
  });

  const partnerData = [
    {
      label: "MMTC PAMP",
      value: "MMTC PAMP",
    },
  ];

  const handleLogout = () => logout(navigation);

  const navigateToDashboard = (userType, user) => {
    if (userType === "customer") {
      navigation.navigate("CustomerBottomTabs", {});
    } else if (userType === "waiter") {
      navigation.navigate("StaffBottomTabs", {});
    } else if (userType === "manager") {
      navigation.navigate("ManagerBottomTabs", {});
    } else if (userType === "partner") {
      navigation.navigate("PartnerBottomTabs", {});
    } else if (userType === "admin") {
      navigation.navigate("AdminBottomTabs", {});
    } else {
    }
  };

  const handleProceedButton = async () => {
    // if (!isButtonDisabled) {
    //   setModalVisible(true);
    // } else {
    //   setAlert(true);
    //   setIsButtonDisabled(true);
    // }
    if (email !== "" && password !== "") {
      const formData = {
        email: email.trim(),
        password: password.trim(),
      };
      try {
        const response = await fetch(
          "https://api.webcodecare.com/api/eastgold/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          console.log("Form data submitted successfully");
          //  console.log(formData);
          setStatusAlert(true);
          setShowAlert(false);
          const result = await response.json();
          //console.log(result);
          const token = await result.token;
          const decoded = jwtDecode(token);
          const user = {
            name: decoded.name,
            email: decoded.email,
            phone: decoded.phone,
            user_type: decoded.user_type,
            token: token,
          };
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user_type", user.user_type);
          await AsyncStorage.setItem("user", JSON.stringify(user));

          navigateToDashboard(user.user_type, user);
        } else {
          console.error("Failed to submit form data");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Login failed");
      setAlert(true);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();

        if (expirationTime < currentTime) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user_type");
          await AsyncStorage.removeItem("user");
        } else {
          const userType = await AsyncStorage.getItem("user_type");
          const user = await AsyncStorage.getItem("user");

          if (userType && user) {
            navigateToDashboard(userType, JSON.parse(user));
          }
        }
      }
    };

    checkToken();
  }, []);

  const fullNumber = selectedItem?.code + number;

  // console.log(fullNumber);

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.border}></View>
        <LinearGradient
          colors={["#d1a669", "#c29555", "#a37739"]}
          style={styles.mainContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.3, y: 0.5 }}
        >
          {/*---- Input Field Email ---- */}
          <Text style={styles.inputLabel}>Enter Email</Text>
          <View style={styles.inputContainer}>
            {/* <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdownData}
              search
              maxHeight={300}
              placeholder={
                selectedItem ? (
                  <View style={styles.placeholderItem}>
                     <Image
                      source={{ uri: selectedItem.flagUrl }}
                      style={{ width: 30, height: 20, marginRight: 10 }}
                    /> 
                    <Text
                      style={{ color: "#333", fontSize: 20, letterSpacing: 1 }}
                    >
                      {selectedItem.code}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.placeholderItem}>
                   <Image
              source={{ uri: selectedItem.flagUrl }}
              style={{ width: 30, height: 20, marginRight: 10 }}
            />
                    <Text style={{ color: "#333" }}>+91</Text>
                  </View>
                )
              }
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setSelectedItem(item.custom);
                setIsFocus(false);
              }}
              renderItem={(item) => (
                <View style={styles.dropdownItem}>
                  <Image
                    source={{ uri: item.custom.flagUrl }}
                    style={{ width: 40, height: 30, marginRight: 10 }}
                  />
                  <Text>{item.label}</Text>
                </View>
              )}
            /> */}

            {/* <TextInput
              placeholder=""
              placeholderTextColor={"#807d7d"}
              style={styles.input}
              onChangeText={handleTextInputChange}
              maxLength={10}
              value={number}
              keyboardType="phone-pad"
            /> */}
            <TextInput
              placeholder="example@abc.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
          {alert && email === "" ? (
            <Text style={styles.alertText}>Please enter an email</Text>
          ) : null}
          {/*---- Input Field Email ---- */}
          <Text style={[styles.inputLabel, { marginTop: 20 }]}>
            Enter Password
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder=""
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              style={styles.visibilityButton}
              onPress={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <FontAwesome name="eye-slash" size={20} color="#202121" />
              ) : (
                <FontAwesome name="eye" size={20} color="#202121" />
              )}
            </TouchableOpacity>
          </View>
          {alert && password === "" ? (
            <Text style={styles.alertText}>Please enter the password</Text>
          ) : null}

          {/* {alert && number.length == 0 ? (
            <Text style={styles.alertText}>Please enter an Phone number</Text>
          ) : alert && number.length < 7 ? (
            <Text style={styles.alertText}>
              The number must be more than 7 digit
            </Text>
          ) : null} */}

          {/*---- Input Field of Partner ---- */}
          <Text style={styles.inputLabel2}>Select your gold partner</Text>
          <View style={styles.inputContainer}>
            <Dropdown
              style={[
                styles.dropdown2,
                partnerIsFocus && { borderColor: "blue" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={partnerData}
              maxHeight={300}
              placeholder={
                selectPartner ? (
                  <View style={styles.placeholderItem}>
                    <Text
                      style={{
                        color: "#333",
                        fontSize: 20,
                        letterSpacing: 1,
                        fontWeight: "700",
                      }}
                    >
                      {selectPartner}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.placeholderItem}>
                    <Text style={{ color: "#fff" }}>+000</Text>
                  </View>
                )
              }
              searchPlaceholder="Search..."
              value={partnerValue}
              onFocus={() => setPartnerIsFocus(true)}
              onBlur={() => setPartnerIsFocus(false)}
              onChange={(item) => {
                setPartnerValue(item.value);
                setSelectPartner(item.label);
                setPartnerIsFocus(false);
              }}
              renderItem={(item) => (
                <View style={styles.dropdownItem2}>
                  <Text>{item.label}</Text>
                </View>
              )}
            />
          </View>

          <Text style={styles.normalText}>
            Don't have an account?{" "}
            <Text style={styles.linkText}>Register Now</Text>
          </Text>
        </LinearGradient>

        {/*--- Proceed Button --- */}
        <View style={styles.buttonMainContainer}>
          <TouchableOpacity
            onPress={handleProceedButton}
            style={styles.buttonContainer}
          >
            <Text style={styles.skipText}>Proceed</Text>
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
      <OtpScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        fullNumber={fullNumber}
        navigation={navigation}
      />
      {showAlert && (
        <Alert
          text={"Please email & password!"}
          style={{ color: "#fff" }}
          setShowAlert={() => setShowAlert(false)}
        />
      )}
      {statusAlert && (
        <StatusAlert
          status={"ok"}
          text={"Successfully LogedIn!"}
          setShowAlert={() => setStatusAlert(false)}
          style={{ marginVertical: 10 }}
        />
      )}
    </ScrollView>
  );
};

export default LoginForm;
