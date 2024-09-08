import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { styles } from "./style";
import LogoImg from "../../../assets/3.png";
import { useTranslation } from "react-i18next";

const ThirdScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.firstScreenContainer}>
      <View style={styles.goldenShadow}>
        <Image source={LogoImg} style={[styles.image, styles.shadow]} />
      </View>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>{t("welcomeHeadingThree")}</Text>
      </View>
      <View style={styles.smTextContainer}>
        <Text style={styles.smText}>{t("welcomeTitleThree")}</Text>
      </View>
    </View>
  );
};

export default ThirdScreen;
