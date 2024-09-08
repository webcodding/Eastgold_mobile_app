import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { styles } from "./style";
import LogoImg from "../../../assets/2.png";
import { useTranslation } from "react-i18next";

const SecondScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.firstScreenContainer}>
      <View style={styles.goldenShadow}>
        <Image source={LogoImg} style={[styles.image, styles.shadow]} />
      </View>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>{t("welcomeHeadingTwo")}</Text>
      </View>
      <View style={styles.smTextContainer}>
        <Text style={styles.smText}>{t("welcomeTitleTwo")}</Text>
      </View>
    </View>
  );
};

export default SecondScreen;
