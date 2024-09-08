import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  //basic
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    paddingLeft: 20,
  },
  normalText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 300,
  },
  //top content
  dashboardTopContent: {
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "space-between",
    marginTop: 50,
    marginRight: 20,
  },
  topArrowContainer: {
    //backgroundColor: "#2d2e2e",
    width: 40,
    height: 40,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  topArrow: {},
  // dashboard

  //Sales
  //Performance
  // Wallet
});
