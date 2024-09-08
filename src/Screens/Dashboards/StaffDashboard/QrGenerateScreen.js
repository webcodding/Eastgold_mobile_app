//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ProfileNotification from "../../../components/ProfileNotification";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import InputField from "../../../components/Inputs/InputField";
import Alert from "../../../components/Alert/Alert";
import StatusAlert from "../../../components/Alert/StatusAlert";

const QrGenerateScreen = ({ navigation, profile }) => {
  const profileInfo = profile;

  const [branchDiscount, setBranchDiscount] = useState("");
  const [customerCashBack, setCustomerCashBack] = useState("");
  const [waiterCashBack, setWaiterCashBack] = useState("");
  const [goldBuyPrice, setGoldBuyPrice] = useState("");
  const [Waiter, setWaiter] = useState(null);
  const [branch, setBranch] = useState(null);
  const [allBranches, setAllBranches] = useState([]);
  const [allWaiters, setAllWaiters] = useState([]);

  const [QrCodeInfo, setQrCodeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQr, setShowQr] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [showWaiter, setShowWaiter] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);
  const [qrLoading, setQrLoading] = useState(true);

  const getBranches = async () => {
    const response = await fetch("https://api.webcodecare.com/api/branch")
      .then((res) => res.json())
      .then((data) => setAllBranches(data));
    return response;
  };

  const getWaiters = async () => {
    const response = await fetch("https://api.webcodecare.com/api/waiter")
      .then((res) => res.json())
      .then((data) => setAllWaiters(data));
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getBranches(), getWaiters()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleGenrerateQr = () => {
    setShowQr(true);
  };

  if (loading) {
    return (
      <LayoutWrapper>
        <View style={[golbalStyle.container, { marginTop: 120 }]}>
          <ActivityIndicator size="large" color="#acacad" />
        </View>
      </LayoutWrapper>
    );
  }

  const branchDropdown = () => {
    setShowBranch((prevOpen) => !prevOpen);
    setShowWaiter(false);
  };
  const WaiterDropdown = () => {
    setShowWaiter((prevOpen) => !prevOpen);
    setShowBranch(false);
  };

  const selectBranch = (item) => {
    setBranch({ id: item.id, image: item.image.url, name: item.branch_name });
    setShowBranch(false);
  };
  const selectWaiter = (item) => {
    setWaiter({
      id: item.id,
      image: item.image.url,
      name: item.name,
    });
    setShowWaiter(false);
  };

  const handleSubmit = async () => {
    if (
      branch &&
      Waiter &&
      branchDiscount !== "" &&
      goldBuyPrice !== "" &&
      waiterCashBack !== "" &&
      customerCashBack !== ""
    ) {
      const formData = {
        cashier_waiter_id: Waiter.id,
        branch_id: branch.id,
        branch_discount_amount: branchDiscount,
        customer_cash_back_amount: customerCashBack,
        waiter_cash_back_amount: waiterCashBack,
        gold_buy_price_today: goldBuyPrice,
      };
      try {
        const response = await fetch(
          "https://api.webcodecare.com/api/qrCodeGenerates",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const result = await response.json().then((data) => data);
        //console.log(result);
        setQrCodeInfo(result.data);

        if (response.status) {
          setStatusAlert(true);
          setShowQr(true);
          setBranch(null);
          setWaiter(null);
          setGoldBuyPrice("");
          setBranchDiscount("");
          setWaiterCashBack("");
          setCustomerCashBack("");
          setQrLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowAlert(true);
    }
  };

  const handleImageLoad = () => {
    setQrLoading(false);
  };

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* ----- Top Content ------ */}
        <View style={[golbalStyle.topProfileContainer]}>
          {/* <TouchableOpacity
            style={[styles.shadowContainer]}
            onPress={handleGenrerateQr}
          >
            <View style={styles.buttonMainConatiner}>
              <LinearGradient
                colors={["#2d2e2e", "#1a1b1c", "#161717"]}
                style={styles.buttonContainer}
                start={{ x: 0.3, y: 1.5 }}
                end={{ x: 0, y: 0.2 }}
              >
                <Text style={styles.buttonText}>Generate</Text>
                <Ionicons
                  name="qr-code-outline"
                  size={20}
                  color="#fff"
                  style={{ opacity: 0.2 }}
                />
              </LinearGradient>
            </View>
          </TouchableOpacity> */}
          <PrevArrowButton />
          {/*------------- */}
          <ProfileNotification
            navigation={navigation}
            profile={profileInfo}
            navigateUrl={"UserProfile"}
          />
        </View>
        {/* -------------- */}
        {/* ------ Form -------- */}
        <View style={styles.form}>
          <InputField
            placeholder={"Branch Discount amount"}
            value={branchDiscount}
            onChangeText={setBranchDiscount}
            icon={() => (
              <MaterialIcons name="discount" size={18} color="#acacad" />
            )}
          />
          <InputField
            placeholder={"Gold Buy price today"}
            value={goldBuyPrice}
            onChangeText={setGoldBuyPrice}
            icon={() => <FontAwesome6 name="coins" size={20} color="#c29555" />}
          />

          <InputField
            placeholder={"Customer Cash back amount"}
            value={customerCashBack}
            onChangeText={setCustomerCashBack}
            icon={() => <FontAwesome name="dollar" size={18} color="#acacad" />}
          />
          <InputField
            placeholder={"Waiter Cash back amount"}
            value={waiterCashBack}
            onChangeText={setWaiterCashBack}
            icon={() => <FontAwesome name="dollar" size={18} color="#acacad" />}
          />
          {/* Waiter & Branch */}
          <View style={[golbalStyle.row, { justifyContent: "space-between" }]}>
            <View>
              <InputField
                text={"Add Waiter"}
                pickerFunction={WaiterDropdown}
                value={Waiter}
                width={150}
                icon={() => (
                  <>
                    <Entypo name="chevron-down" size={24} color="#acacad" />
                  </>
                )}
              />
              {showWaiter && (
                <ScrollView style={[styles.dropdown, { height: 230 }]}>
                  <View
                    style={{
                      marginBottom: 15,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    {allWaiters.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[golbalStyle.row, styles.dropdownItem]}
                        onPress={() => selectWaiter(item)}
                      >
                        <Image src={item.image.url} style={styles.manImg} />
                        <Text style={[golbalStyle.normalText, styles.dropText]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            <View>
              <InputField
                text={"Add Branch"}
                pickerFunction={branchDropdown}
                value={branch}
                width={150}
                icon={() => (
                  <Entypo name="chevron-down" size={24} color="#acacad" />
                )}
              />
              {showBranch && (
                <ScrollView style={[styles.dropdown, { height: 230 }]}>
                  <View
                    style={{
                      marginBottom: 15,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
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
          </View>
        </View>
        {/*  Qr Generate Button */}
        <TouchableOpacity style={styles.borderContainer} onPress={handleSubmit}>
          <LinearGradient
            colors={["#7a5c01", "#d49d1e", "#a17903"]}
            style={styles.btnContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.3, y: 0.5 }}
          >
            <Text style={styles.buttonText}>Generate Qr</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* -------------- */}
        {/* ------ QR Image -------- */}
        <View style={styles.centerConatiner}>
          {showQr ? (
            QrCodeInfo ? (
              <Image
                src={QrCodeInfo.qr_code_path}
                style={{ width: 200, height: 200 }}
                onLoad={handleImageLoad}
              />
            ) : (
              <ActivityIndicator size="large" color="#acacad" />
            )
          ) : (
            <Ionicons
              name="qr-code-outline"
              size={40}
              color="#fff"
              style={{ opacity: 0.2 }}
            />
          )}
        </View>
        {/* -------------- */}
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
          text={"Successfully create information!"}
          setShowAlert={() => setStatusAlert(false)}
          style={{ marginVertical: 10 }}
        />
      )}
    </LayoutWrapper>
  );
};

export default QrGenerateScreen;

const styles = StyleSheet.create({
  // shadowContainer: {
  //   width: 102,
  //   height: 71.4,
  //   borderRadius: 13,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowRadius: 20,
  //   shadowOpacity: 1,
  //   elevation: 10,
  //   // marginTop: 60,
  //   borderRightWidth: 0,
  // },
  // buttonMainConatiner: {
  //   width: 102,
  //   height: 71.4,
  //   borderRadius: 13,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowRadius: 20,
  //   shadowOpacity: 1,
  //   elevation: 15,
  //   borderWidth: 0.7,
  //   borderColor: "#383838",
  //   borderRightWidth: 0,
  //   marginTop: -5,
  //   marginLeft: -4,
  // },
  // buttonContainer: {
  //   width: 100,
  //   height: 70,
  //   borderRadius: 13,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // buttonText: {
  //   color: "#fff",
  //   opacity: 0.3,
  //   fontFamily: "Poppins_Medium",
  // },
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
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  centerConatiner: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
  form: {
    marginTop: -25,
  },
});
