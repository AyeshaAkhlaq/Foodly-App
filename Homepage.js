import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { CartContext } from "./CartContext"; // Import CartContext

// Array of images
const images = {
  "ChocolateFudge.png": require("./assets/ChocolateFudge.png"),
  "brownies.png": require("./assets/brownies.png"),
  "nutellasundae.png": require("./assets/nutellasundae.png"),
  "threemilk.png": require("./assets/threemilk.png"),
  "coffee.png": require("./assets/coffee.png"),
  "redvelvet.png": require("./assets/redvelvet.png"),
};

// Product data
const products = [
  {
    category: "Cakes",
    items: [
      {
        name: "Chocolate Fudge",
        image: "ChocolateFudge.png",
        price: 2000,
        description: "Rich and indulgent chocolate fudge cake, layered with velvety ganache for a melt-in-your-mouth experience.",
      },
      {
        name: "Three Milk Cake",
        image: "threemilk.png",
        price: 3299,
        description: "A moist and creamy tres leches cake soaked in a trio of milk, topped with whipped cream.",
      },
      {
        name: "Coffee Cake",
        image: "coffee.png",
        price: 1699,
        description: "Fluffy coffee-flavored cake with a hint of cinnamon, perfect for coffee lovers and dessert enthusiasts alike.",
      },
      {
        name: "Red Velvet Cake",
        image: "redvelvet.png",
        price: 2399,
        description: "A classic red velvet cake with a smooth cream cheese frosting, ideal for celebrations and sweet cravings.",
      },
    ],
  },
];

const HomePage = ({ navigation }) => {
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false); // Dropdown visibility state

  // Function to toggle dropdown visibility
  const toggleMenuDropdown = () => {
    setMenuDropdownOpen((prev) => !prev);
  };

  // Function to handle category navigation
  const handleCategoryClick = (category) => {
    setMenuDropdownOpen(false); // Close dropdown after selection
    if (category === "Cakes") {
      navigation.navigate("CakeScreen");
    } else if (category === "Brownies") {
      navigation.navigate("BrownieScreen");
    } else if (category === "Sundaes") {
      navigation.navigate("SundaeScreen");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sweet Treats</Text>
        <Text style={styles.subHeaderText}>
          Your Destination for Heavenly Desserts
        </Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image source={images["threemilk.png"]} style={styles.heroImage} />
        <Text style={styles.heroText}>
          Indulge in the Sweetest Cakes, Brownies & Sundaes!
        </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={toggleMenuDropdown}>
          <Text style={styles.ctaText}>Order Now</Text>
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {isMenuDropdownOpen && (
          <View style={styles.subMenu}>
            <TouchableOpacity onPress={() => handleCategoryClick("Cakes")} style={styles.subMenuItem}>
              <Image source={images["ChocolateFudge.png"]} style={styles.categoryImage} />
              <Text style={styles.subMenuText}>Cakes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryClick("Brownies")} style={styles.subMenuItem}>
              <Image source={images["brownies.png"]} style={styles.categoryImage} />
              <Text style={styles.subMenuText}>Brownies</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryClick("Sundaes")} style={styles.subMenuItem}>
              <Image source={images["nutellasundae.png"]} style={styles.categoryImage} />
              <Text style={styles.subMenuText}>Sundaes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Categories Section */}
      {products.map((category, index) => (
        <View key={index} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category.category}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.items.map((item, idx) => (
              <View key={idx} style={styles.productCard}>
                <Image source={images[item.image]} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>PKR {item.price}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fef9f4",
  },
  header: {
    backgroundColor: "#b89e6a",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#fce2b7",
    fontSize: 16,
    fontStyle: "italic",
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  heroText: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#b89e6a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
  },
  subMenu: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  categoryImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: "contain",
  },
  subMenuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5b3924",
  },
  categorySection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 24,
    color: "#5b3924",
    marginBottom: 10,
    alignSelf: "center",
  },
  productCard: {
    width: 200,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5b3924",
    marginTop: 10,
  },
  productDescription: {
    fontSize: 12,
    color: "#7a5746",
    textAlign: "center",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#b89e6a",
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: "#b89e6a",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default HomePage;