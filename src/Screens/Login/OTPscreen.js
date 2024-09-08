import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import CustomKeyboard from "./CustomKeyboard";

const CELL_COUNT = 6;

const OtpScreen = ({
  navigation,
  modalVisible,
  setModalVisible,
  fullNumber,
}) => {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(120); // Initial timer value in seconds
  const [timerActive, setTimerActive] = useState(false); // State to track if timer is active
  const [alert, setAlert] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    let interval;
    if (modalVisible) {
      // Start the timer when modal is opened
      setTimer(120); // Reset timer to initial value
      setTimerActive(true);
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            // Timer reached 0, stop the timer
            setTimerActive(false);
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      // Reset timer when modal is closed
      setTimerActive(false);
      setTimer(120);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [modalVisible]);

  useEffect(() => {
    setAlert(false);
  }, [value]);
  const handleVerify = () => {
    if (value.length === CELL_COUNT) {
      setAlert(false);
      navigation.navigate("DashboardLogin");
      setModalVisible(false);
      setOtp(value);
      setTimerActive(false);
    } else {
      setAlert(true);
    }
  };

  const handleResendOTP = () => {
    setValue("");
    setModalVisible(true);
    setTimer(120);
    setTimerActive(true);
  };

  const handleKeyboardPress = (digit) => {
    const newValue = value + digit;
    if (newValue.length <= CELL_COUNT) {
      setValue(newValue);
    }
  };

  const handleDelete = () => {
    const newValue = value.slice(0, -1);
    setValue(newValue);
  };
  const handleOtpInput = (newValue) => {
    if (newValue.length <= CELL_COUNT) {
      setAlert(false);
      if (newValue !== prevValueRef.current) {
        setValue(newValue);
        prevValueRef.current = newValue;
      }
    }
  };
  if (otp !== "" && !timerActive) {
    // console.log(otp);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <LinearGradient
              colors={["#2d2e2e", "#191a1a", "#000000"]}
              style={styles.modalView}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.3, y: 0.5 }}
            >
              <View style={styles.mainContainer}>
                {/*---- Top Content ---- */}
                <View style={styles.topContent}>
                  <Text style={styles.verifyText}>Verify OTP</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={28}
                      color={"#333"}
                    />
                  </Pressable>
                </View>

                {/*---- Middle Content ---- */}
                <View style={styles.middleContent}>
                  <Text style={styles.normalText}>Verify Mobile Number </Text>
                  <Text style={styles.number}>{fullNumber}</Text>
                </View>
                {/* --- OTP Input ---- */}
                <Text style={[styles.normalText, styles.title]}>Enter OTP</Text>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(e) => handleOtpInput(e.target.value)}
                  keyboardType="phone-pad"
                  maxLength={6}
                  editable={false}
                />
                {alert ? (
                  <Text style={styles.alertText}>
                    Please Enter 6 Digit OTP!
                  </Text>
                ) : null}
                {/*---- Bottom Content ---- */}
                <View style={styles.bottomContent}>
                  <TouchableOpacity
                    style={styles.leftContent}
                    onPress={handleResendOTP}
                  >
                    <FontAwesome5 name="redo" color={"#c29555"} size={15} />
                    <Text style={styles.resendText}>Resend OTP</Text>
                  </TouchableOpacity>
                  {/*--- Timer --- */}
                  <View style={styles.rightContent}>
                    <AntDesign name="clockcircle" color={"#c29555"} size={15} />
                    {/*--- Timer ----- */}
                    <Text style={styles.timerText}>
                      {`${Math.floor(timer / 60)}:${
                        timer % (60).toString().padStart(2, "0")
                      }`}
                    </Text>
                    {/**----- */}
                  </View>
                </View>
                {/*--- Verify Button --- */}
                <TouchableOpacity
                  onPress={handleVerify}
                  style={styles.borderContainer}
                >
                  <LinearGradient
                    colors={["#7a5c01", "#d49d1e", "#a17903"]}
                    style={styles.btnContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.3, y: 0.5 }}
                  >
                    <Text style={styles.buttonText}>Verify</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <CustomKeyboard
                onPress={handleKeyboardPress}
                onDelete={handleDelete}
              />
            </LinearGradient>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    backgroundColor: "rgba(4, 4, 4, 0.64)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 82,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,

    //alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 90,
  },
  mainContainer: {
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  button: {
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#c29555",
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "100%",
  },
  middleContent: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    // width: "100%",
    marginTop: 20,
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //width: "100%",
    marginTop: 30,
  },
  normalText: {
    color: "#c29555",
    fontFamily: "Poppins_Regular",
    fontSize: 16,
    flexWrap: "wrap",
    textAlign: "left",
    opacity: 0.8,
  },
  number: {
    color: "#c29555",
    fontFamily: "Nunito_ExtraBold",
    fontSize: 16,
  },
  verifyText: {
    color: "#c29555",
    fontFamily: "Nunito_ExtraBold",
    fontSize: 22,
  },
  title: {
    marginTop: 40,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#c29555",
    paddingBottom: 5,
    fontSize: 28,
    color: "#c29555",
    fontFamily: "Poppins_Regular",
    marginTop: 20,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  resendText: {
    color: "#c29555",
    fontFamily: "Poppins_Regular",
    fontSize: 15,
    textAlign: "left",
    marginLeft: 5,
    opacity: 0.8,
    marginTop: 4,
  },
  timerText: {
    color: "#c29555",
    fontFamily: "Poppins_Regular",
    fontSize: 15,
    marginLeft: 5,
    marginTop: 4,
    opacity: 0.8,
    textAlign: "right",
  },
  btnContainer: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0,

    borderRadius: 10,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: "#c29555",
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Nunito_Bold",
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  alertText: {
    color: "#fa4402",
    fontFamily: "Poppins_Medium",
    fontSize: 14,
    marginTop: 10,
  },
});

//make this component available to the app
export default OtpScreen;
