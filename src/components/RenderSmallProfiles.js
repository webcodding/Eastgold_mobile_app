import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";

const RenderSmallProfiles = ({ manager, cashiers, customers }) => {
  const profiles = [];

  // Add manager
  if (manager) {
    profiles.push(manager);
  }

  // Add cashiers
  if (cashiers && cashiers.length > 0) {
    profiles.push(...cashiers);
  }

  // Add customers
  if (customers && customers.length > 0) {
    profiles.push(...customers);
  }

  const displayedProfiles = profiles.slice(0, 5); // Show only the first 3 profiles
  const remainingCount = profiles.length - displayedProfiles.length;

  return (
    <View style={styles.profileImagesContainer}>
      {displayedProfiles.map((profile, index) => (
        <Image
          key={index}
          source={profile.image}
          style={[
            styles.profileImage,
            { zIndex: displayedProfiles.length - index },
          ]}
        />
      ))}
      {remainingCount > 0 && (
        <View style={styles.remainingCountCircle}>
          <Text style={styles.remainingCountText}>+{remainingCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileImagesContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 12,
    marginRight: 4,
    opacity: 0.9,
  },
  remainingCountCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
    opacity: 0.6,
  },
  remainingCountText: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Poppins_Bold",
    opacity: 1,
  },
});

export default RenderSmallProfiles;
