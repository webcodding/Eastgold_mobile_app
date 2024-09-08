import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { golbalStyle } from "../../GlobalStyles";
import { Feather } from "@expo/vector-icons";

const LanguageDropdown = ({ selectedLanguage, onValueChange }) => {
  const allLanguage = ["English", "Bangla", "Malyshia", "French"];
  const [langModalVisible, setLangModalVisible] = useState(false);

  const handleSelect = (lang) => {
    onValueChange(lang);
    setLangModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 2,
          borderColor: "#acacad",
          width: 200,
          paddingVertical: 5,
          paddingHorizontal: 10,
          marginTop: 10,
        }}
        onPress={() => setLangModalVisible((prevOpen) => !prevOpen)}
      >
        <Text style={[golbalStyle.normalText]}>{selectedLanguage}</Text>
        <Feather
          name="chevron-down"
          size={20}
          color="#fff"
          style={{ opacity: 0.7 }}
        />
      </TouchableOpacity>
      {langModalVisible && (
        <View style={styles.dropback}>
          <TouchableOpacity onPress={() => setLangModalVisible(false)}>
            <View style={styles.modalContent}>
              <FlatList
                data={allLanguage}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  modalOverlay: {
    //flex: 1,
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalContent: {
    width: "60%",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginLeft: 0,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#363636",
  },
  modalItemText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#fff",
    opacity: 0.7,
    fontFamily: "Poppins_Regular",
  },
  dropback: {
    // backgroundColor: "#363636",
    //padding: 10,
    marginBottom: 10,
    height: "auto",
  },
});

export default LanguageDropdown;
