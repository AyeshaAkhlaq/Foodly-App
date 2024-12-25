import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import jsonData from "./items.json";

const images = {
  "ChocolateFudge.png": require("./assets/ChocolateFudge.png"),
  "threemilk.png": require("./assets/threemilk.png"),
  "coffee.png": require("./assets/coffee.png"),
  "redvelvet.png": require("./assets/redvelvet.png"),
  "brownies.png": require("./assets/brownies.png"),
  "caramel.png": require("./assets/caramel.png"),
  "oreo.png": require("./assets/oreo.png"),
  "espresso.png": require("./assets/espresso.png"),
  "nutellabrownie.png": require("./assets/nutellabrownie.png"),
  "galaxysundae.png": require("./assets/galaxysundae.png"),
  "nutellasundae.png": require("./assets/nutellasundae.png"),
  "redvelvetsundae.png": require("./assets/redvelvetsundae.png"),
  "threemilksundae.png": require("./assets/threemilksundae.png"),
};

const Search = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);

    if (text === "") {
      setResults([]);
      return;
    }

    const filteredResults = jsonData.products.flatMap((category) =>
      category.items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
    setResults(filteredResults);
  };

  const renderItem = ({ item }) => {
    // Check if the item belongs to the "Cakes" category
    const isCake = jsonData.products.some((category) =>
      category.items.some((cakeItem) => cakeItem.name === item.name && category.category === "Cakes")
    );

    const isBrownie = jsonData.products.some((category) =>
        category.items.some((cakeItem) => cakeItem.name === item.name && category.category === "Brownies")
      );
    const isSundae = jsonData.products.some((category) =>
        category.items.some((cakeItem) => cakeItem.name === item.name && category.category === "Sundaes")
      );

    return (
      <TouchableOpacity
        onPress={() => {
          if (isCake) {
            navigation.navigate("CakeScreen", { highlightedItem: item });
          }else if (isBrownie) {
            navigation.navigate("BrownieScreen", { highlightedItem: item });
          }
           else {
             
                navigation.navigate("SundaeScreen", { highlightedItem: item });
              
          }
        }}style={styles.card}
      >
        <Image source={images[item.image]} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for items..."
        value={query}
        onChangeText={handleSearch}
      />
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noResults}>
          {query === "" ? "Start typing to search" : "No items found"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noResults: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Search;
