import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

import styles from "./styles";
import { cashierTransections } from "../../../demo-data";
import ProfileNotification from "../../../components/ProfileNotification";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";

const WalletScreen = ({ navigation, profile }) => {
  const profileInfo = profile;
  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* ----- Top Content ------ */}
        <View style={golbalStyle.topProfileContainer}>
          <Text style={styles.headText}>Wallet</Text>
          <ProfileNotification
            navigation={navigation}
            profile={profileInfo}
            navigateUrl={"UserProfile"}
          />
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
                <Text style={styles.visaText}>VISA</Text>
                <Text style={styles.miniText}>11/23</Text>
              </View>
              <View
                style={[
                  styles.cardTopContent,
                  { justifyContent: "flex-start" },
                ]}
              >
                <Text style={styles.starText}>**** **** **** </Text>
                <Text style={styles.normalText}>1234</Text>
              </View>
              <Text style={styles.dollerText}>$22,345</Text>
            </LinearGradient>
          </View>
        </View>
        {/* ----- Transection History ------ */}
        <View style={styles.historyContainer}>
          <Text style={[styles.normalText, { fontSize: 16, opacity: 0.5 }]}>
            Transection History
          </Text>
          <TouchableOpacity>
            <Text style={[styles.miniText, { color: "#5f5e61" }]}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.historyMainContainer}>
          {cashierTransections.map((item, index) => (
            <LinearGradient
              colors={["#2a2a2b", "#191a1a"]}
              key={index}
              style={[styles.historyItem]}
              start={{ x: 0.6, y: 0.4 }}
              end={{ x: 0.2, y: 1.8 }}
            >
              <View style={styles.rightContent}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#242526"]}
                  style={styles.imageContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.3, y: 0.5 }}
                >
                  <View style={styles.imageShadow}>
                    <Image
                      source={item.userImage}
                      style={[styles.recentCardImg, { width: 50, height: 40 }]}
                    />
                  </View>
                </LinearGradient>
                <View style={{ flexDirection: "column", marginLeft: 13 }}>
                  <Text style={styles.codeId}>{item.codeId}</Text>
                  <Text style={styles.billerTitle}>{item.userName}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#242526"]}
                  style={[styles.topArrowContainer, { width: 30, height: 30 }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.3, y: 0.5 }}
                >
                  {item.transectionType === "export" ? (
                    <AntDesign name="arrowup" size={17} color="red" />
                  ) : (
                    <AntDesign name="arrowdown" size={17} color="green" />
                  )}
                </LinearGradient>
                <Text style={styles.paymentText}>{item.payment}</Text>
                <Text style={styles.typeText}>{item.date}</Text>
              </View>
            </LinearGradient>
          ))}
        </ScrollView>
      </View>
    </LayoutWrapper>
  );
};

export default WalletScreen;
