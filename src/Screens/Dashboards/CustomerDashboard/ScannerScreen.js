import React, { useEffect, useState, useRef } from "react";
import { Camera, CameraView } from "expo-camera";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { golbalStyle } from "../../../GlobalStyles";
import PrevArrowButton from "../../../components/PrevArrowButton";
import ProfileNotification from "../../../components/ProfileNotification";
import { useCameraPermissions } from "expo-camera";

const ScannerScreen = ({ navigation, profile }) => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  });

  if (!permission?.granted) {
    return null;
  }
  const handleCodeScanned = (data) => {
    //console.log(data);
    setScannedData(data.data);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };

  const scanAgain = () => {
    setScanned(false);
  };

  return (
    <LayoutWrapper>
      <View style={golbalStyle.container}>
        <View style={golbalStyle.topProfileContainer}>
          <PrevArrowButton />
          <ProfileNotification navigation={navigation} profile={profile} />
        </View>
        {/* <View style={styles.shadowContainer}> */}
        <View style={styles.cameraBorder}>
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{ barCodeTypes: ["qr"] }}
            onBarcodeScanned={handleCodeScanned}
          />
        </View>
        {/* </View> */}
        <Text
          style={[
            golbalStyle.normalText,
            {
              color: "#c29555",
              fontSize: 20,
              borderBottomWidth: 2,
              borderColor: "#363636",
              width: 160,
              marginVertical: 10,
            },
          ]}
        >
          Scanned Data:
        </Text>
        <Text style={[golbalStyle.normalText]}>{scannedData}</Text>

        {scanned && (
          <TouchableOpacity style={styles.scanAgainButton} onPress={scanAgain}>
            <Text style={styles.text}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBorder: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#c29555",
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 20,
  },
  shadowContainer: {
    width: 270,
    height: 270,
    shadowColor: "#c29555",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 1,
    alignSelf: "center",
    shadowRadius: 70,
    borderRadius: 30,
    overflow: "hidden",
    position: "relatives",
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  scannedDataText: {
    color: "black",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: "#c29555",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    borderRadius: 5,
  },
  scanAgainButton: {
    backgroundColor: "#c29555",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    borderRadius: 5,
  },
  camera: {
    flex: 1,
    //overflow: "hidden",
  },
});

export default ScannerScreen;
