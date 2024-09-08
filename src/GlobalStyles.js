import { StyleSheet } from "react-native";

export const golbalStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topProfileContainer: {
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "space-between",
    marginTop: 50,
  },
  normalText: {
    color: "#fff",
    fontFamily: "Poppins_Regular",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 160,
  },
  whiteShadow: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
  },
  blackShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 10,
  },
});
