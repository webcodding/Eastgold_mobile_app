import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import ProfileImg from "../../assets/images/cashier.jpg";
import NotifyImg from "../../assets/notification-icon.png";
import GoldCoinImg from "../../assets/4.png";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { notifications } from "../demo-data";
import ChangeLang from "./language/ChangeLang";

const ProfileNotification = ({ navigation, profile, navigateUrl }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [modalWidth, setModalWidth] = useState(0);
  const profileInfo = profile;

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const openModal = () => {
    setModalWidth(screenWidth * 0.85);
    setModalVisible(true);
  };

  const closeModal = () => {
    setAnimating(true);
    setTimeout(() => {
      setModalVisible(false);
      setAnimating(false);
    }, 200);
  };

  return (
    <>
      <View style={styles.rightTopContent}>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() =>
            navigation.navigate(navigateUrl, { profile: profileInfo })
          }
        >
          {profileInfo.image ? (
            <Image source={profileInfo.image} style={[styles.profileImg]} />
          ) : (
            <MaterialIcons
              name="account-circle"
              size={36}
              color="#acacad"
              style={[styles.profileImg, { borderWidth: 0 }]}
            />
          )}
          {/*  */}
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal}>
          <Image source={NotifyImg} style={styles.notifyImg} />
        </TouchableOpacity>
        <ChangeLang />
      </View>
      {/* ------ Notification Modal ----- */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <Animatable.View
              animation={animating ? "slideOutRight" : "slideInRight"}
              duration={400}
              onAnimationEnd={() => {
                if (!modalVisible && animating) {
                  setAnimating(false);
                }
              }}
              style={[
                styles.modalView,
                { height: screenHeight, width: modalWidth },
              ]}
            >
              <View style={styles.modalTopContainer}>
                {/* --- Close Button --- */}
                <Pressable onPress={closeModal}>
                  <AntDesign name="close" size={24} color="#5f5f61" />
                </Pressable>
                <Text style={styles.notifyHeading}>Notifications</Text>
              </View>
              <FlatList
                data={notifications}
                renderItem={({ item }) => (
                  <View style={styles.notifyContainer}>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-start" }}
                    >
                      <Image source={item?.image} style={styles.goldCoin} />
                      <View style={{ flexDirection: "column", marginRight: 8 }}>
                        <Text style={styles.notifyTitle}>{item.title}</Text>
                        <Text style={styles.notifyMsg}>{item.message}</Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </Animatable.View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  rightTopContent: {
    flexDirection: "row",
    alignItems: "start",
    marginRight: 35,
  },
  notifyImg: {
    width: 26,
    height: 26,
    marginTop: 5,
  },
  profileImg: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#2d2e2e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    width: 18,
    height: 66,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
    backgroundColor: "transparent",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "end",
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  modalView: {
    backgroundColor: "#000",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#383838",
    borderRightWidth: 0,
  },
  modalTopContainer: {
    marginTop: 10,
    marginBottom: 15,
    marginVertical: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
  },
  notifyHeading: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 24,
    marginLeft: 20,
  },
  notifyContainer: {
    paddingHorizontal: 6,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#383838",
  },
  notifyTitle: {
    color: "#c29555",
    fontFamily: "Poppins_Medium",
    opacity: 0.8,
    fontSize: 13,
  },
  goldCoin: {
    width: 30,
    height: 30,
    opacity: 0.9,
    marginRight: 5,
  },
  notifyMsg: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
    opacity: 0.8,
    fontSize: 11,
    flexWrap: "wrap",
  },
});

export default ProfileNotification;
