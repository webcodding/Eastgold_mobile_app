import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { golbalStyle } from "../../GlobalStyles";

const InputField = ({
  value,
  onChangeText,
  placeholder,
  text,
  icon,
  width,
  pickerFunction,
  style,
}) => {
  const isURL =
    value && typeof value.image === "string" && value.image.startsWith("http");
  const isImportedImage =
    value &&
    typeof value.image === "object" &&
    value.image.hasOwnProperty("uri");

  const string = value && typeof value === "string";

  return (
    <View style={styles.searchMainContainer}>
      <LinearGradient
        colors={["#191a1a", "#000000"]}
        style={styles.searchContainer}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 0, y: 0 }}
      >
        {placeholder ? (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#acacad"}
            style={[
              styles.inputText,
              width && { width: width },
              style && style,
            ]}
            value={value}
            onChangeText={onChangeText}
          />
        ) : (
          <TouchableOpacity onPress={pickerFunction}>
            {value ? (
              <View
                style={[
                  golbalStyle.row,
                  { justifyContent: "flex-start" },
                  width && { width: width },
                ]}
              >
                {Array.isArray(value) ? (
                  <>
                    {value.map((item, index) => (
                      <Image
                        source={item.image}
                        style={styles.profileImg}
                        key={index}
                      />
                    ))}
                  </>
                ) : value.image && value.name ? (
                  <>
                    {isURL ? (
                      <Image source={{ uri: value.image }} style={styles.img} />
                    ) : (
                      <Image source={value.image} style={styles.img} />
                    )}
                    <Text style={[styles.text]}>{value.name}</Text>
                  </>
                ) : (
                  <Text style={[golbalStyle.normalText, styles.text]}>
                    {value}
                  </Text>
                )}
              </View>
            ) : (
              <Text
                style={[
                  styles.inputText,
                  width && { width: width },
                  style && style,
                ]}
              >
                {text}
              </Text>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ position: "absolute", right: 15, top: -12 }}
          onPress={pickerFunction}
        >
          {icon && icon()}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  searchMainContainer: {
    height: 54,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#383838",
    shadowColor: "#4e4d4f",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
    borderBottomWidth: 0,
    zIndex: 20,
    //marginTop: 20,
  },
  searchContainer: {
    paddingLeft: 20,
    height: 53,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    // paddingRight: 20,
  },
  inputText: {
    color: "#acacad",
    fontFamily: "Poppins_Regular",
    width: "100%",
    fontSize: 12,
    // opacity: 0.7,
  },
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 5,
  },
  text: {
    color: "#acacad",
    fontFamily: "Poppins_Regular",
    fontSize: 12,
    width: 100,
  },
  profileImg: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginLeft: 2,
  },
  badge: {
    backgroundColor: "#c29555",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginHorizontal: 10,
  },
});

export default InputField;
