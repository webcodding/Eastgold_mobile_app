import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async (navigation) => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user_type");
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login"); // Navigate to login screen after logout
  } catch (error) {
    console.log(error);
  }
};
