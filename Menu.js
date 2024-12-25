import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Menu = ({ navigation }) => {
  const handleNavigate = (category) => {
    // Placeholder for category navigation
    // In a real app, you could navigate to a details page or filter the menu based on the category.
    alert(`Selected: ${category}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleNavigate("Cakes")}>
          <Image
            source={require("./assets/ChocolateFudge.png")} // Path to image
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.categoryName}>Cakes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleNavigate("Brownies")}>
          <Image
            source={require("./assets/brownies.png")} // Path to image
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.categoryName}>Brownies</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleNavigate("Sundaes")}>
          <Image
            source={require("./assets/nutellasundae.png")} // Path to image
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.categoryName}>Sundaes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  categoryContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Menu;
