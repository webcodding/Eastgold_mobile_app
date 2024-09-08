import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CustomDropdown = ({ data, selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    onValueChange(item.category);
    setModalVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{selectedValue}</Text>
        <AntDesign name="down" size={16} color="#acacad" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelect(item)}
                >
                  <Image
                    source={{ uri: item.image.url }}
                    style={styles.categoryImage}
                  />
                  <Text style={styles.modalItemText}>{item.category}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "85%",
    // backgroundColor: "#000",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    //borderColor: "#383838",
    //borderWidth: 1,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalContent: {
    width: "70%",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    marginLeft: 25,
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
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default CustomDropdown;
