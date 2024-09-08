import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainText: {
    color: "#c29555",
    fontFamily: "Poppins_Light",
    fontSize: 36,
    textAlign: "center",
    marginHorizontal: 20,
    lineHeight: 50,
    opacity: 0.8,
    textShadowColor: "#000", // Golden color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 10,
  },
  smText: {
    color: "#c29555",
    marginHorizontal: 40,
    fontFamily: "Poppins_Regular",
    fontSize: 14,
    textAlign: "center",
    opacity: 0.6,
    textShadowColor: "#000", // Golden color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5,
    textTransform: "uppercase",
  },
  smTextContainer: {
    marginTop: 20,
  },
  firstScreenContainer: {
    marginTop: 120,
    flexDirection: "column",
    alignItems: "center",
  },
  bottomContent: {
    flexDirection: "row",
    marginTop: 220,
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "#c29555",
    fontSize: 16,
    opacity: 0.7,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  bigIcon: {
    color: "#c29555",
    fontSize: 40,
    marginHorizontal: -10,
  },
  iconsContainer: {
    flexDirection: "row",
    marginLeft: 30,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  skipText: {
    color: "#c29555",
    marginRight: 15,
    fontFamily: "Poppins_Regular",
  },
  arrowBtnContainer: {
    width: 50,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 30,
  },
  arrowBtn: {
    fontSize: 20,
  },
  logoImg: {
    width: 200,
    height: 120,
    marginBottom: 20,
  },
  goldenShadow: {
    width: 200,
    height: 180,
    marginBottom: 20,
    backgroundColor: "transparent",
    shadowColor: "#F9D857",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 100,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "end",
  },
  mainTextContainer: {
    marginTop: 20,
  },
});
