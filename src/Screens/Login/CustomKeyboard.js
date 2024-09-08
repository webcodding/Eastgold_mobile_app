import React, { memo, useCallback } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Font5Icon from "react-native-vector-icons/FontAwesome5";

const CustomKeyboard = ({ onPress, onDelete }) => {
  const handlePress = useCallback(
    (num) => {
      onPress(num);
    },
    [onPress]
  );

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);
  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.rightButtons}>
        <View style={styles.row}>
          {[1, 2, 3].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keyButton}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keyButton}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keyButton}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.column}>
        <TouchableOpacity style={styles.button2}>
          <Font5Icon name="star-of-life" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleDelete}>
          <FeatherIcon name="x-square" size={32} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => handlePress(0)}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#474646",
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rightButtons: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 7,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  keyButton: {
    backgroundColor: "#fabe75",
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  button2: {
    backgroundColor: "#ffd29c",
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 3,
    marginBottom: 7,
  },
  buttonText: {
    color: "#333",
    fontSize: 24,
    fontFamily: "Poppins_Medium",
    marginTop: 3,
  },
});

export default memo(CustomKeyboard);
