import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Login from "./src/Screens/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/Screens/WelcomeScreens/WelcomeScreen";
import BillerSearchScreen from "./src/Screens/SearchScreen/BillerSearchScreen";
import Profile from "./src/Screens/UserProfile/UserProfile";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StaffBottomTabs from "./src/Screens/Dashboards/StaffDashboard/BottomsTabs";
import DashboardLogin from "./src/Screens/DashboardLoginScreen";
import ManagerBottomTabs from "./src/Screens/Dashboards/ManagerDashboard/BottomTabs";
import AdminBottomTabs from "./src/Screens/Dashboards/Admin/BottomTabs";
import PartnerBottomTabs from "./src/Screens/Dashboards/PartnerDashboard/BottomTabs";
import CustomerBottomTabs from "./src/Screens/Dashboards/CustomerDashboard/BottomTabs";
import BranchSearchScreen from "./src/Screens/SearchScreen/BranchSearchScreen";
import BranchDetailScreen from "./src/Screens/Detail/BranchDetailScreen";
import AddBranchFormScreen from "./src/Screens/Add/AddBranchFormScreen";
import SettingProfile from "./src/Screens/UserProfile/SettingProfile";
import MyBranchesSearchScreen from "./src/Screens/SearchScreen/MyBranchesSearchScreen";
import AllPartnerSearchScreen from "./src/Screens/SearchScreen/AllPartnersSearchScreen";
import AddPartnerFormScreen from "./src/Screens/Add/AddPartnerFormScreen";
import AddManagerFormScreen from "./src/Screens/Add/AddManagerForm";
import AddCashierFormScreen from "./src/Screens/Add/AddCahierFormScreen";
import AddCategoryFormScreen from "./src/Screens/Add/AddCategoryForm";
import AllManagerSearchScreen from "./src/Screens/SearchScreen/AllManagerSearchScreen";
import AllWaiterSearchScreen from "./src/Screens/SearchScreen/AllWaiterSearchScreen";
import EditBranch from "./src/Screens/Edit/EditBranch";
import EditManager from "./src/Screens/Edit/EditManager";
import EditPartner from "./src/Screens/Edit/EditPartner";
import EditWaiter from "./src/Screens/Edit/EditWaiter";
import PartnerDetailScreen from "./src/Screens/Detail/PartnerDetailScreen";
import WaiterDetailScreen from "./src/Screens/Detail/WaiterDetailScreen";
import ManagerDetailScreen from "./src/Screens/Detail/ManagerDetailScreen";
import "./translation";
import HotOfferDetailScreen from "./src/Screens/Detail/HotOfferDetail";
import EditHotOffer from "./src/Screens/Edit/EditHotOffer";
import AddHotOfferFormScreen from "./src/Screens/Add/AddHotOffer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "./src/Screens/Login/LogoutFunction";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    Nunito_Bold: require("./assets/fonts/Nunito/static/Nunito-Bold.ttf"),
    Nunito_ExtraBold: require("./assets/fonts/Nunito/static/Nunito-ExtraBold.ttf"),
    Nunito_Regular: require("./assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    Nunito_BoldItalic: require("./assets/fonts/Nunito/static/Nunito-BoldItalic.ttf"),
    Lato_Bold: require("./assets/fonts/Lato/Lato-Bold.ttf"),
    Lato_Regular: require("./assets/fonts/Lato/Lato-Regular.ttf"),
    Poppins_Regular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    Poppins_Bold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    Poppins_Medium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins_Light: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    Poppins_Thin: require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
    Poppins_BoldItalic: require("./assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
    Poppins_SemiBoldItalic: require("./assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf"),
  });
  const [initialRoute, setInitialRoute] = useState("WelcomeScreen");
  const handleLogout = () => logout(navigation);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();

        if (expirationTime < currentTime) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user_type");
          await AsyncStorage.removeItem("user");
          setInitialRoute("WelcomeScreen");
        } else {
          const userType = await AsyncStorage.getItem("user_type");
          if (userType) {
            switch (userType) {
              case "customer":
                setInitialRoute("CustomerBottomTabs", {});
                break;
              case "waiter":
                setInitialRoute("StaffBottomTabs", {});
                break;
              case "manager":
                setInitialRoute("ManagerBottomTabs", {});
                break;
              case "partner":
                setInitialRoute("PartnerBottomTabs", {});
                break;
              case "admin":
                setInitialRoute("AdminBottomTabs", {});
                break;
              default:
                setInitialRoute("LoginForm");
            }
          }
        }
      } else {
        setInitialRoute("WelcomeScreen");
      }
    };

    checkToken();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName={initialRoute}>
          {/* Login screens */}
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardLogin"
            component={DashboardLogin}
            options={{ headerShown: false }}
          />
          {/* -------------- */}

          {/* Seacrh Screens */}
          <Stack.Screen
            name="BillerSearchScreen"
            component={BillerSearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BranchSearchScreen"
            component={BranchSearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyBranchSearchScreen"
            component={MyBranchesSearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllPartnerSearchScreen"
            component={AllPartnerSearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllManagerSearch"
            component={AllManagerSearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllWaiterSearch"
            component={AllWaiterSearchScreen}
            options={{ headerShown: false }}
          />
          {/* -------------- */}

          {/* Detail Screens */}
          <Stack.Screen
            name="BranchDetail"
            component={BranchDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PartnerDetail"
            component={PartnerDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WaiterDetail"
            component={WaiterDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManagerDetail"
            component={ManagerDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HotOfferDetail"
            component={HotOfferDetailScreen}
            options={{ headerShown: false }}
          />
          {/* -------------- */}

          {/* Edit screens */}
          <Stack.Screen
            name="EditBranch"
            component={EditBranch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPartner"
            component={EditPartner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditManager"
            component={EditManager}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditWaiter"
            component={EditWaiter}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditHotOffer"
            component={EditHotOffer}
            options={{ headerShown: false }}
          />
          {/* -------------- */}

          {/* Profile screens */}
          <Stack.Screen
            name="UserProfile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingProfile"
            component={SettingProfile}
            options={{ headerShown: false }}
          />
          {/* -------------- */}

          {/* Form screens */}
          <Stack.Screen
            name="AddBranchForm"
            component={AddBranchFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddPartnerForm"
            component={AddPartnerFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddManagerForm"
            component={AddManagerFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCashierForm"
            component={AddCashierFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCategoryForm"
            component={AddCategoryFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddHotOfferForm"
            component={AddHotOfferFormScreen}
            options={{ headerShown: false }}
          />
          {/* -------------- */}

          {/* -------------Dashboards ----------- */}
          <Stack.Screen
            name="AdminBottomTabs"
            component={AdminBottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PartnerBottomTabs"
            component={PartnerBottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerBottomTabs"
            component={CustomerBottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StaffBottomTabs"
            component={StaffBottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManagerBottomTabs"
            component={ManagerBottomTabs}
            options={{ headerShown: false }}
          />
          {/* -------------Dashboards ----------- */}
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
