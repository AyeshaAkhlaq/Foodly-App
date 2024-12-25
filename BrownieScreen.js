import React, { useContext,useState,useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import jsonData from "./items.json"; // Import your JSON file
import { CartContext } from "./CartContext"; // Import the CartContext
import { useRoute } from "@react-navigation/native";



// Map for image imports
const images = {
  "brownies.png": require("./assets/brownies.png"),
  "caramel.png": require("./assets/caramel.png"),
  "oreo.png": require("./assets/oreo.png"),
  "espresso.png": require("./assets/espresso.png"),
  "nutellabrownie.png": require("./assets/nutellabrownie.png"),
};

const BrownieScreen = () => {
  // Extract the Brownies category from the JSON data
  const brownies = jsonData.products.find((category) => category.category === "Brownies")?.items || [];
  const { addToCart } = useContext(CartContext);
  const route = useRoute();
  const highlightedItem = route.params?.highlightedItem || null;

  const [highlightedItemState, setHighlightedItemState] = useState(highlightedItem);

  useEffect(() => {
    if (highlightedItemState) {
      const timer = setTimeout(() => {
        setHighlightedItemState(null); // Reset highlighted item after 2 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [highlightedItemState]); // Run the effect whenever the highlightedItemState changes

  // Render each brownie item
  const renderBrownieItem = ({ item }) => (
    <View style={[styles.card, highlightedItemState && highlightedItemState.name === item.name && styles.highlight]}>
      <Image source={images[item.image]} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Price: Rs {item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity onPress={() => addToCart(item)} style={styles.button}>
  <Text style={styles.buttonText}>Add to Cart</Text>
</TouchableOpacity>
<TouchableOpacity
      style={[
        styles.item,
        highlightedItem && highlightedItem.name === item.name && styles.highlight, ]}>
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Brownies</Text>
      {brownies.length > 0 ? (
        <FlatList
          data={brownies}
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          renderItem={renderBrownieItem} // Render each item
          numColumns={2} // Display items in grid layout
          contentContainerStyle={styles.list} // Add padding to the list
          showsVerticalScrollIndicator={false} // Optional: hides the scroll bar
        />
      ) : (
        <Text style={styles.error}>No brownies available at the moment.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes full height
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
     color: "#fff",
    backgroundColor:"#b89e6a",
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    paddingBottom: 20, // Add padding at the bottom for spacing
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    maxWidth: "50%", // Adjust width for better grid spacing
    marginLeft: 10,
    marginHorizontal: 10, // Space between columns
    marginBottom: 20, // Space between rows
    height: 'auto', // Adjust card height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlight: {
    backgroundColor: "#F5F5DC", // Highlight color
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    backgroundColor: "#b89e6a",
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default BrownieScreen;