import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet } from "react-native";

const Rating = ({ rating, size }) => {
  const filledStars = Math.floor(Math.min(rating, 5)); // Ensure filledStars does not exceed 5
  const hasHalfStar = rating % 1 !== 0 && rating <= 4.5; // Check if there's a half star and avoid exceeding 5 stars

  // Function to render filled stars
  const renderFilledStars = (count) => {
    let stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <FontAwesome
          key={`filled-${i}`}
          name="star"
          size={size}
          color="#f5d400"
        />
      );
    }
    return stars;
  };

  // Function to render half star
  const renderHalfStar = () => {
    return (
      <FontAwesome
        key="half"
        name="star-half-empty"
        size={size}
        color="#f5d400"
      />
    );
  };

  // Function to render empty stars
  const renderEmptyStars = (count) => {
    let stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <FontAwesome
          key={`empty-${i}`}
          name="star"
          size={size}
          color="#c9c9c5"
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {renderFilledStars(filledStars)}
      {hasHalfStar && renderHalfStar()}
      {renderEmptyStars(5 - filledStars - (hasHalfStar ? 1 : 0))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Rating;
