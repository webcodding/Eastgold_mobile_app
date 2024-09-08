import { useEffect, useState } from "react";
import i18n from "i18next";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { golbalStyle } from "../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
export default function ChangeLang() {
  const [show, setShow] = useState(false);
  const [langugae, setLangugae] = useState();

  useEffect(() => {
    const ChangeLangugae = async () => {
      if (!i18n.languages) {
        await i18n.changeLanguage(langugae);
      }
      await i18n.changeLanguage(langugae);
    };
    ChangeLangugae();
  }, [langugae]);

  const handleLanguage = (lang) => {
    setLangugae(lang);
    setShow(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow((prev) => !prev)}
        style={styles.word}
      >
        <LinearGradient
          colors={["#2d2e2e", "#191a1a", "#242526"]}
          style={styles.topArrowContainer}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1.3, y: 1.8 }}
        >
          <Ionicons name="language" size={20} color="#c29555" />
        </LinearGradient>

        {/* <FontAwesome name="language" size={24} color="#c29555" /> */}
        {/* <Fontisto name="world-o" size={24} color="#c29555" /> */}
      </TouchableOpacity>
      {/* when the icone click it will show this part */}
      {show ? (
        <ScrollView
          showsHorizontalScrollIndicator={true}
          style={[golbalStyle.whiteShadow, styles.dropdown]}
        >
          <TouchableOpacity
            onPress={() => handleLanguage("en")}
            style={{ borderBottomWidth: 1, paddingBottom: 4 }}
          >
            <Text style={styles.langugaeText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLanguage("bg")}
            style={{ borderBottomWidth: 1, paddingTop: 4 }}
          >
            <Text style={styles.langugaeText}>Bangla</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLanguage("bm")}
            style={{ paddingTop: 4 }}
          >
            <Text style={styles.langugaeText}>Malysia</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    top: 44,
    right: -20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    zIndex: 60,
  },
  image: {
    flex: 1,
  },
  iconImg: {
    width: 50,
    height: 50,
    top: 80,
    left: 30,
  },
  iconImg2: {
    width: 70,
    height: 70,
    alignSelf: "flex-end",
    right: 20,
    top: 300,
  },
  word: {
    position: "absolute",
    marginHorizontal: 10,
    marginTop: 0,
  },
  langugaeText: {
    fontFamily: "Poppins_Medium",
    fontSize: 14,
    color: "#fff",
    opacity: 0.6,
    marginVertical: 5,
  },
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 35,
    height: 35,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
