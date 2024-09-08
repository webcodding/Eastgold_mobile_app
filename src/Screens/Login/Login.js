//import liraries
import React, { Component, useState } from "react";
import { View, Image, SafeAreaView } from "react-native";
import styles from "./styles";
import SEYF from "../../../assets/SEYF.png";
import LoginForm from "./LoginForm";
import { LinearGradient } from "expo-linear-gradient";
import GoldBarImg from "../../../assets/4.png";
import LayoutWrapper from "../../components/LayoutWrapper";

// create a component
const Login = ({ navigation }) => {
  return (
    <LayoutWrapper>
      <View style={styles.imageContainer1}>
        <View style={styles.rightTopContent}>
          <Image source={GoldBarImg} style={styles.goldImg} />
          <View style={styles.textContainer}>
            <Image source={SEYF} style={styles.seyfImg} />
          </View>
        </View>
      </View>

      <LoginForm navigation={navigation} />
    </LayoutWrapper>
  );
};

export default Login;
