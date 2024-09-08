import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../Button/Button";
import { golbalStyle } from "../../GlobalStyles";

const ProfileSettingModal = ({
  visible,
  onClose,
  content,
  text,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={["#2d2e2e", "#191a1a", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.3, y: 0.5 }}
          style={styles.modalContent}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons
              name="close"
              size={24}
              color="#fff"
              style={{ opacity: 0.6, marginBottom: 30 }}
            />
          </TouchableOpacity>
          <Text style={[golbalStyle.normalText]}>
            {text === "Delete Account" || text === "Sign out"
              ? null
              : `Set New ${text}`}
          </Text>
          <View style={styles.content}>{content}</View>
          {text === "Delete Account" ? (
            <View
              style={[
                golbalStyle.row,
                { justifyContent: "center", marginBottom: 20 },
              ]}
            >
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={[golbalStyle.normalText]}>close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={[golbalStyle.normalText, { color: "red" }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          ) : text === "Sign out" ? (
            <View
              style={[
                golbalStyle.row,
                { justifyContent: "center", marginBottom: 20 },
              ]}
            >
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={[golbalStyle.normalText]}>close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={[golbalStyle.normalText, { color: "#c29555" }]}>
                  Sign out
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginTop: 0 }}>
              <Button text={"Update"} onclick={() => setModalVisible(false)} />
            </View>
          )}
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    // backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // height: 300,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  content: {
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "center",
    //height: "100%",
  },
  button: {
    backgroundColor: "#363636",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 5,
  },
});

export default ProfileSettingModal;
