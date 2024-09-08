import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import LayoutWrapper from "../../components/LayoutWrapper";
import PrevArrowButton from "../../components/PrevArrowButton";
import { golbalStyle } from "../../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../../components/Inputs/InputField";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import Alert from "../../components/Alert/Alert";
import * as FileSystem from "expo-file-system";
import StatusAlert from "../../components/Alert/StatusAlert";
import { getBranches, getManagers, updateWaiter } from "../../apiService";

const EditWaiter = ({ navigation, route }) => {
  const token = route.params.data.token;
  const waiter = route.params.data.waiter;
  const prevBranch = route.params.data.branch;
  const prevManager = route.params.data.manager;

  const [allmanagers, setAllManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [branch, setBranch] = useState(
    Array.isArray(prevBranch)
      ? []
      : {
          name: prevBranch.branch_name,
          image: prevBranch.image.url,
          id: prevBranch.id,
        }
  );
  const [manager, setManager] = useState(
    Array.isArray(prevManager)
      ? []
      : {
          id: prevManager.id,
          name: prevManager.manager_name,
          image: prevManager.image.url,
        }
  );
  const [name, setName] = useState(waiter.name);
  const [desc, setDesc] = useState(waiter.desc);
  const [goldBack, setGoldBack] = useState(waiter.gold_back);
  const [fin, setFin] = useState(waiter.fin);
  const [WaiterImg, setWaiterImg] = useState(waiter.image.url);

  const [showBranches, setShowBranches] = useState(false);
  const [showManagers, setShowManagers] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);
  const [activeWaiter, setActiveWaiter] = useState(
    waiter.is_active == 1 ? true : false
  );
  const [allBranches, setAllBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchesData, managersData] = await Promise.all([
          getBranches(token),
          getManagers(token),
        ]);
        setAllBranches(branchesData.data);
        setAllManagers(managersData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <LayoutWrapper>
        <View style={[golbalStyle.container, { marginTop: 120 }]}>
          <ActivityIndicator size="large" color="#acacad" />
        </View>
      </LayoutWrapper>
    );
  }
  const branchDropdown = () => {
    setShowBranches((prevOpen) => !prevOpen);
    setShowManagers(false);
  };
  const managerDropdown = () => {
    setShowManagers((prevOpen) => !prevOpen);
    setShowBranches(false);
  };

  const selectBranch = (item) => {
    setBranch(
      item ? { name: item.branch_name, image: item.image.url, id: item.id } : []
    );
    setShowBranches(false);
  };
  const selectManager = (item) => {
    setManager(
      item
        ? { id: item.id, name: item.manager_name, image: item.image.url }
        : null
    );
    setShowManagers(false);
  };
  const pickWaiterImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setWaiterImg(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      let formattedBase64;

      if (WaiterImg.startsWith("http")) {
        const response = await fetch(WaiterImg);
        const blob = await response.blob();
        const reader = new FileReader();

        formattedBase64 = await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64String = reader.result;
            resolve(
              base64String.startsWith("data:")
                ? base64String
                : `data:image/png;base64,${base64String}`
            );
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } else {
        const imageBase64 = await FileSystem.readAsStringAsync(WaiterImg, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formattedBase64 = `data:image/png;base64,${imageBase64}`;
      }
      const formData = {
        name: name,
        desc: desc,
        gold_back: goldBack,
        fin: fin,
        is_active: activeWaiter,
        branch_id: Array.isArray(branch) ? "0" : branch.id,
        branch_manager_id: Array.isArray(manager) ? "0" : manager.id,
        image: formattedBase64,
      };

      const response = await updateWaiter(waiter.id, formData, token);
      //  console.log(response);

      if (response.ok) {
        console.log("Form data submitted successfully");
        setStatusAlert(true);
        setShowAlert(false);
      }
      if (response.status === 500) {
        console.log("Status 500!");
        //setStatusAlert(true);
        // setShowAlert(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigation.goBack();
  };

  const toggleSwitch = () => setActiveWaiter((previousState) => !previousState);

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        {/* --- Profile Container --- */}
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <Text
            style={[golbalStyle.normalText, { color: "#c29555", fontSize: 18 }]}
          >
            {" "}
            Edit Waiter Details
          </Text>
        </View>
        {/* -------- Form Start ----- */}

        <View style={styles.form}>
          {/* branch */}
          <View>
            <InputField
              text={"Branch"}
              pickerFunction={branchDropdown}
              value={Array.isArray(branch) ? "No Branch" : branch}
              width={150}
              icon={() => (
                <>
                  <Entypo name="chevron-down" size={24} color="#acacad" />
                </>
              )}
            />
            {showBranches && (
              <ScrollView style={[styles.dropdown, { height: 230 }]}>
                <View
                  style={{
                    marginBottom: 15,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={[golbalStyle.row, styles.dropdownItem]}
                    onPress={() => selectBranch()}
                  >
                    <Text style={[golbalStyle.normalText, styles.dropText]}>
                      No Branch
                    </Text>
                  </TouchableOpacity>
                  {allBranches.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[golbalStyle.row, styles.dropdownItem]}
                      onPress={() => selectBranch(item)}
                    >
                      <Image src={item.image.url} style={styles.manImg} />
                      <Text style={[golbalStyle.normalText, styles.dropText]}>
                        {item.branch_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
          {/* branch-manager */}
          <View>
            <InputField
              text={"Branch Manager"}
              pickerFunction={managerDropdown}
              value={manager}
              width={150}
              icon={() => (
                <>
                  <Entypo name="chevron-down" size={24} color="#acacad" />
                </>
              )}
            />
            <TouchableOpacity
              style={[golbalStyle.row, styles.dropdownItem]}
              onPress={() => selectManager()}
            >
              <Text style={[golbalStyle.normalText, styles.dropText]}>
                No Manager
              </Text>
            </TouchableOpacity>
            {showManagers && (
              <ScrollView style={[styles.dropdown, { height: 230 }]}>
                <View
                  style={{
                    marginBottom: 15,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  {allmanagers.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[golbalStyle.row, styles.dropdownItem]}
                      onPress={() => selectManager(item)}
                    >
                      <Image src={item.image.url} style={styles.manImg} />
                      <Text style={[golbalStyle.normalText, styles.dropText]}>
                        {item.manager_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
          {/* Waiter name */}
          <InputField
            placeholder={"Waiter Name"}
            value={name}
            onChangeText={setName}
          />
          {/*  Fin */}
          <InputField placeholder={"Fin"} value={fin} onChangeText={setFin} />

          {/* Description */}
          <InputField
            placeholder={"Description"}
            value={desc}
            onChangeText={setDesc}
          />
          {/* Gold back */}
          <InputField
            placeholder={"Gold Back"}
            value={goldBack}
            onChangeText={setGoldBack}
          />

          {/* Image */}
          <InputField
            text={"Waiter Image"}
            width={150}
            style={{ fontSize: 12 }}
            pickerFunction={pickWaiterImage}
            icon={
              WaiterImg
                ? () => (
                    <TouchableOpacity onPress={pickWaiterImage}>
                      <Image
                        source={{ uri: WaiterImg }}
                        style={styles.brandImage}
                      />
                    </TouchableOpacity>
                  )
                : () => (
                    <TouchableOpacity onPress={pickWaiterImage}>
                      <Feather name="image" size={24} color="#acacad" />
                    </TouchableOpacity>
                  )
            }
          />
          {/* Active Branch */}
          <InputField
            text={"Active Waiter"}
            pickerFunction={toggleSwitch}
            icon={() => (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={activeWaiter ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={activeWaiter}
                style={{ marginTop: -12 }}
              />
            )}
          />
          {/*  Add Button */}
          <TouchableOpacity
            style={styles.borderContainer}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={["#7a5c01", "#d49d1e", "#a17903"]}
              style={styles.btnContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.3, y: 0.5 }}
            >
              <Text style={styles.buttonText}>Update</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* -------- Form End ----- */}
      </View>
      {showAlert && (
        <Alert
          text={"Please fill all the fields!"}
          style={{ color: "#fff" }}
          setShowAlert={() => setShowAlert(false)}
        />
      )}
      {statusAlert && (
        <StatusAlert
          status={"ok"}
          text={"Successfully Updated!"}
          setShowAlert={() => setStatusAlert(false)}
          style={{ marginVertical: 10 }}
        />
      )}
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 25,
  },
  brandImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    opacity: 0.8,
    marginTop: -5,
    //objectFit: "contain",
  },
  btnContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0,

    borderRadius: 5,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: "#c29555",
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_Medium",
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  dropdown: {
    backgroundColor: "#282829",
    padding: 10,
    paddingRight: 20,
    borderRadius: 5,
    position: "absolute",
    top: 60,
    left: 5,
    zIndex: 30,
    height: 260,
    paddingVertical: 20,
    // width: 160,
    marginBottom: 20,
  },
  dropdownItem: {
    marginVertical: 15,
  },
  dropText: {
    opacity: 0.6,
  },
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 25,
    height: 25,
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
    marginHorizontal: 5,
  },
  catImg: {
    width: 22,
    height: 22,
    borderRadius: 50,
  },
  manImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
});

export default EditWaiter;
