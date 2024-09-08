import React, { Component, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";
import { ScrollView } from "react-native-gesture-handler";
import barlogo from "../../../../assets/4.png";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Wallet = ({ navigation, profile }) => {
  const [buy, setBuy] = useState(true);
  const [sell, setSell] = useState(false);

  const [buyContinue, setBuyContinue] = useState(false);
  const [sellContinue, setSellContinue] = useState(false);

  const [buyinputValue, setbuyinputValue] = useState(null);
  const [sellinputValue, setsellinputValue] = useState(null);
  const [buyPrice, setBuyPrice] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);

  const handlerBuy = (event) => {
    if (event.length > 0) {
      setBuyContinue(true);
      setSellContinue(false);
      setbuyinputValue(event);
    } else {
      setBuyContinue(false);
      setBuyPrice(null);
    }
  };

  const handlerSell = (event) => {
    if (event.length > 0) {
      setBuyContinue(false);
      setSellContinue(true);
      setsellinputValue(event);
    } else {
      setSellContinue(false);
      setSellPrice(null);
    }
  };

  const handlerCalculate = (params) => {
    if (params === "buy") {
      const price = Number(buyinputValue) * 102;
      setBuyPrice(price);
    } else if (params === "sell") {
      // console.log(sellinputValue);
      const price = parseFloat(Number(sellinputValue)) * 84.0;
      setSellPrice(price.toFixed(2));
    }
  };

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification navigation={navigation} profile={profile} />
        </View>
        {/* ----- Middle Content ------ */}
        <View style={styles.walletMainContainer}>
          <View style={styles.walletContainer}>
            <LinearGradient
              colors={["#bd5404", "#f7954a", "#fa9f5a"]}
              style={styles.walletCard}
              start={{ x: 0.6, y: 0.2 }}
              end={{ x: 0.2, y: 1.8 }}
            >
              <View style={styles.cardTopContent}>
                <Text style={styles.visaText}>Your Current Balance</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View
                  style={[
                    styles.cardTopContent,
                    { justifyContent: "flex-start", width: "70%" },
                  ]}
                >
                  <Text style={styles.starText}>**** **** **** </Text>
                  <Text style={styles.normalText}>1234</Text>
                </View>

                <View style={[{ width: "30%" }]}>
                  <Text style={[styles.normalText, { textAlign: "right" }]}>
                    $2014.00
                  </Text>
                  <View
                    style={[golbalStyle.row, { justifyContent: "flex-end" }]}
                  >
                    <Image
                      source={barlogo}
                      style={[styles.barlogoImg, { marginRight: 5 }]}
                    />
                    <Text style={[styles.normalText]}>4500 gm</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[styles.buttonText]}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
        {/* ----- Middle Content ------ */}
        {/* ----- buy and sell content ------*/}
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={[styles.switchContent, styles.border]}>
              <TouchableOpacity
                onPress={() => {
                  setBuy(true);
                  setSell(false);
                  setSellContinue(false);
                  setSellPrice(null);
                }}
              >
                <Text style={buy ? styles.switchText : styles.switchActive}>
                  Buy
                </Text>
              </TouchableOpacity>

              <Text style={styles.slash}>{" / "}</Text>
              <TouchableOpacity
                onPress={() => {
                  setBuy(false);
                  setSell(true);
                  setBuyContinue(false);
                  setBuyPrice(null);
                }}
              >
                <Text style={sell ? styles.switchText : styles.switchActive}>
                  Sell
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 6 }}>
              <Image source={barlogo} style={[styles.barlogoImg]} />
            </View>
          </View>
          {/* ----- Input side ---- */}
          {buy && (
            <View
              style={[golbalStyle.row, { justifyContent: "space-between" }]}
            >
              <TouchableOpacity
                style={styles.searchMainConatiner}
                onPress={() => {}}
              >
                <LinearGradient
                  colors={["#191a1a", "#000000"]}
                  style={styles.searchContainer}
                  start={{ x: 0, y: 0.2 }}
                  end={{ x: 0, y: 0 }}
                >
                  <TextInput
                    placeholder="Enter Gold Amount"
                    placeholderTextColor={"#4b4b4d"}
                    style={styles.inputText}
                    onChangeText={handlerBuy}
                    keyboardType="numeric"
                  />
                </LinearGradient>
              </TouchableOpacity>
              <View style={[golbalStyle.column, { alignItems: "center" }]}>
                <Text style={styles.priceText}>Price/gm</Text>
                <Text style={styles.normalText}>
                  {buyPrice ? buyPrice : 102} $
                </Text>
              </View>
            </View>
          )}

          {sell && (
            <View
              style={[golbalStyle.row, { justifyContent: "space-between" }]}
            >
              <TouchableOpacity
                style={styles.searchMainConatiner}
                onPress={() => {}}
              >
                <LinearGradient
                  colors={["#191a1a", "#000000"]}
                  style={styles.searchContainer}
                  start={{ x: 0, y: 0.2 }}
                  end={{ x: 0, y: 0 }}
                >
                  <TextInput
                    placeholder="Enter Gold Amount"
                    placeholderTextColor={"#4b4b4d"}
                    style={styles.inputText}
                    keyboardType="numeric"
                    onChangeText={handlerSell}
                  />
                </LinearGradient>
              </TouchableOpacity>
              <View style={[golbalStyle.column, { alignItems: "center" }]}>
                <Text style={styles.priceText}>Price/gm</Text>

                <Text style={styles.normalText}>
                  {" "}
                  {sellPrice ? sellPrice : "84.00"} $
                </Text>
              </View>
            </View>
          )}

          <View
            style={{
              flexDirection: "col",
              alignItems: "center",
            }}
          >
            {buyContinue && (
              <TouchableOpacity onPress={() => handlerCalculate("buy")}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#000000"]}
                  style={[styles.Continuebtnstyle]}
                  start={{ x: 0.6, y: 0.4 }}
                  end={{ x: 0.2, y: 1.8 }}
                >
                  <Text style={[styles.buttonText]}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            {sellContinue && (
              <TouchableOpacity onPress={() => handlerCalculate("sell")}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#000000"]}
                  style={[styles.Continuebtnstyle]}
                  start={{ x: 0.6, y: 0.4 }}
                  end={{ x: 0.2, y: 1.8 }}
                >
                  <Text style={[styles.buttonText]}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/*----------- */}
          <View>
            <Text style={styles.boldText}>Choose Payment Method</Text>
            <TouchableOpacity
              style={[golbalStyle.row, { justifyContent: "space-around" }]}
            >
              <TouchableOpacity onPress={() => {}}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#000000"]}
                  style={styles.card}
                  start={{ x: 0.6, y: 0.4 }}
                  end={{ x: 0.2, y: 1.8 }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="creditcard"
                      size={35}
                      style={[styles.icones]}
                    />
                  </View>
                </LinearGradient>
                <Text style={[styles.iconesText, { textAlign: "center" }]}>
                  Visa / MasterCard
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#000000"]}
                  style={styles.card}
                  start={{ x: 0.6, y: 0.4 }}
                  end={{ x: 0.2, y: 1.8 }}
                >
                  <FontAwesome name="bank" size={35} style={[styles.icones]} />
                </LinearGradient>
                <Text style={[styles.iconesText, { textAlign: "center" }]}>
                  Bank
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LayoutWrapper>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  walletMainContainer: {
    height: 184,
    marginTop: 30,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    elevation: 20,
  },
  walletContainer: {},
  walletCard: {
    height: 180,
    borderRadius: 20,
    opacity: 0.8,
    marginTop: -5,
    marginLeft: 2,
    shadowColor: "#faa15c",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    elevation: 50,
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  visaText: {
    fontFamily: "Poppins_Medium",
    fontSize: 18,
    color: "#fff",
  },
  cardTopContent: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  starText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Nunito_Regular",
    letterSpacing: 1.2,
  },
  normalText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    letterSpacing: 1.2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Nunito_Regular",
    letterSpacing: 1.2,
  },
  iconesText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Nunito_Regular",
    letterSpacing: 1.2,
    opacity: 0.5,
  },
  btnstyle: {
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
  },
  Continuebtnstyle: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderWidth: 0.7,
    borderColor: "#383838",
    borderRadius: 5,
  },

  barlogoImg: {
    width: 20,
    height: 20,
  },

  border: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#c29555",
    // width: "60%",
  },

  switchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingBottom: 5,
    marginRight: 20,
    marginBottom: 10,
  },
  switchText: {
    fontFamily: "Poppins_Medium",
    fontSize: 16,
    color: "#c29555",
    // opacity: 0.6,
  },
  slash: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 15,
    opacity: 0.8,
  },
  switchActive: {
    fontFamily: "Poppins_Medium",
    fontSize: 16,
    color: "#c29555",
    opacity: 0.6,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
  },
  searchMainConatiner: {
    height: 54,
    width: "73%",
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: "#383838",
    shadowColor: "#4e4d4f",
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  searchContainer: {
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  inputText: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
    width: "100%",
  },
  priceText: {
    color: "#c29555",
    fontSize: 14,
    fontFamily: "Poppins_Regular",
    letterSpacing: 1.2,
    opacity: 0.8,
  },
  boldText: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 15,
    opacity: 0.6,
    marginTop: 30,
  },
  icones: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 25,
    opacity: 0.8,
  },
  card: {
    width: 140,
    height: 80,
    // borderWidth: 0.6,
    borderColor: "#383838",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Wallet;
