import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import { golbalStyle } from "../../GlobalStyles";
import { getUsers } from "../../apiService";

const Profile = ({ route, navigation, profile, logout }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = profile.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData] = await Promise.all([getUsers(token)]);

        setUserInfo(userData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  if (loading) {
    return (
      <LayoutWrapper>
        <ActivityIndicator
          size="large"
          color="#acacad"
          style={{ marginTop: 150 }}
        />
      </LayoutWrapper>
    );
  }

  const user = userInfo.filter((item) => item.email === profile.email);

  const profileInfo = profile;
  return (
    <LayoutWrapper>
      <View style={styles.container}>
        <View style={[golbalStyle.row, styles.head]}>
          <PrevArrowButton />
          <TouchableOpacity
            style={[golbalStyle.row]}
            onPress={() =>
              navigation.navigate("SettingProfile", { profile: user[0] })
            }
          >
            <SimpleLineIcons
              name="settings"
              size={20}
              color="#fff"
              style={{ opacity: 0.6, marginRight: 5 }}
            />
            <Text style={[golbalStyle.normalText, styles.setting]}>
              Profile Setting
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topContent}>
          {user.length > 0 ? (
            <Image src={user[0].image.url} style={styles.profileImg} />
          ) : (
            <MaterialIcons name="account-circle" size={90} color="#acacad" />
          )}
          <Text style={styles.name}>{profileInfo.name}</Text>
        </View>
        <View style={styles.middleContent}>
          <Text style={styles.about}>About</Text>
          <View style={styles.border}></View>
          <View style={styles.infoContent}>
            <FontAwesome
              name="user"
              size={18}
              color="#c29555"
              style={styles.icon}
            />
            <Text style={styles.heading}>User Type:</Text>
            <Text style={styles.text}>{profileInfo.user_type}</Text>
          </View>
          <View style={styles.infoContent}>
            <Entypo
              name="email"
              size={18}
              color="#c29555"
              style={styles.icon}
            />
            <Text style={styles.heading}>Email:</Text>
            <Text style={styles.text}>{profileInfo.email}</Text>
          </View>
          {/* <View style={styles.infoContent}>
            <FontAwesome
              name="location-arrow"
              size={18}
              color="#c29555"
              style={styles.icon}
            />
            <Text style={styles.heading}>Location:</Text>
            <Text style={styles.text}>{profileInfo.location}</Text> 
          </View> */}
          <View style={styles.infoContent}>
            <FontAwesome5
              name="phone"
              size={18}
              color="#c29555"
              style={styles.icon}
            />
            <Text style={styles.heading}>Number:</Text>
            <Text style={styles.text}>{profileInfo.phone}</Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 6,
              borderWidth: 1,
              borderColor: "#c29555",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              marginTop: 20,
            }}
            onPress={logout}
          >
            <Text style={[golbalStyle.normalText, { color: "#c29555" }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  head: {
    marginTop: 50,
    justifyContent: "space-between",
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  topContent: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  name: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 24,
    marginTop: 20,
  },
  middleContent: {
    flexDirection: "column",
  },
  about: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 20,
    marginTop: 30,
  },
  infoContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  heading: {
    color: "#fff",
    opacity: 0.9,
    fontSize: 16,
    fontFamily: "Nunito_Regular",
    marginRight: 10,
  },
  text: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 16,
    fontFamily: "Nunito_Regular",
  },
  border: {
    width: 100,
    height: 2,
    backgroundColor: "#c29555",
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  setting: {
    opacity: 0.6,
    fontSize: 10,
  },
});

export default Profile;
