//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather } from "@expo/vector-icons";

import { allBillers, biller } from "../../../demo-data";
import ProfileNotification from "../../../components/ProfileNotification";
import LayoutWrapper from "../../../components/LayoutWrapper";
import PrevArrowButton from "../../../components/PrevArrowButton";
import { golbalStyle } from "../../../GlobalStyles";

const StaffDashboard = ({ navigation, profile, logout }) => {
  const profileInfo = profile;
  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* ----- Top Content ------ */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification
            navigation={navigation}
            profile={{ profile: profileInfo, logout: logout }}
            navigateUrl={"UserProfile"}
          />
        </View>
        {/* ------- Middle Content ----- */}
        <Text style={styles.recentText}>Recent Biller</Text>
        <ScrollView
          horizontal={true}
          style={styles.RecentBillarContainer}
          showsHorizontalScrollIndicator={false}
        >
          {biller.map((item, index) => (
            <View style={styles.mainRecentConatiner} key={index}>
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#000000"]}
                style={styles.recentCards}
                start={{ x: 0.6, y: 0.4 }}
                end={{ x: 0.2, y: 1.8 }}
              >
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#242526"]}
                  style={styles.topArrowContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.3, y: 0.5 }}
                >
                  <View style={styles.imageShadow}>
                    <Image
                      source={item.image}
                      style={styles.recentCardImg}
                      width={item.width}
                      height={item.height}
                    />
                  </View>
                </LinearGradient>
                <Text style={styles.recentCardTitle}>{item.title}</Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
        {/*------ Bottom Content ----- */}
        <Text style={styles.boldText}>Biller Name or ID</Text>
        {/* ----- Search bar ---- */}
        <TouchableOpacity
          style={styles.searchMainConatiner}
          onPress={() =>
            navigation.navigate("BillerSearchScreen", {
              allBillers: allBillers,
            })
          }
        >
          <LinearGradient
            colors={["#191a1a", "#000000"]}
            style={styles.searchContainer}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 0 }}
          >
            <Text
              placeholder=""
              placeholderTextColor={"#4b4b4d"}
              style={styles.inputText}
            >
              Search by name or ID
            </Text>
            <Feather
              name="search"
              size={22}
              color="#4b4b4d"
              style={styles.searchIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
        {/*----------- */}
        <ScrollView
          horizontal={true}
          style={styles.billarMainContainer}
          showsHorizontalScrollIndicator={false}
        >
          {allBillers.map((item, index) => (
            <View style={styles.billarConatiner} key={index}>
              <LinearGradient
                colors={["#2d2e2e", "#191a1a", "#000000"]}
                style={styles.billarCards}
                start={{ x: 0.6, y: 0.4 }}
                end={{ x: 0.2, y: 1.8 }}
              >
                <LinearGradient
                  colors={["#2d2e2e", "#191a1a", "#242526"]}
                  style={styles.topArrowContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.3, y: 0.5 }}
                >
                  <View style={styles.imageShadow}>
                    <Image source={item.image} style={styles.recentCardImg} />
                  </View>
                </LinearGradient>
                <Text style={styles.codeText}>{item.codeId}</Text>
                <Text style={styles.billarTitle}>{item.title}</Text>
                <Text style={styles.typeText}>{item.type}</Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      </View>
    </LayoutWrapper>
  );
};

export default StaffDashboard;
