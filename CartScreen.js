import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";

const CartScreen = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const shippingCharges = 100;
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.10;
  const grandTotal = subtotal + tax + shippingCharges;

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image || require('./assets/logo.png')} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rs {item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => item.quantity > 1 && updateQuantity(item.name, -1)} 
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.name, 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.name)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    if (!isLoggedIn) {
      Alert.alert("Login Required", "Please log in to proceed with checkout.", [
        { text: "OK", onPress: () => navigation.navigate("Login") }
      ]);
    } else {
      navigation.navigate("Checkout", { grandTotal });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.name ? item.name.toString() : String(item.id)} // Fixed keyExtractor
            contentContainerStyle={styles.list}
          />
          <View style={styles.summary}>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryText}>Subtotal: Rs {subtotal.toFixed(2)}</Text>
              <Text style={styles.summaryText}>Shipping: Rs {shippingCharges}</Text>
              <Text style={styles.summaryText}>Tax: Rs {tax.toFixed(2)}</Text>
              <Text style={styles.summaryText}>Grand Total: Rs {grandTotal.toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "#333", textAlign: "center", marginVertical: 20 },
  list: { paddingBottom: 20 },
  itemContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16, padding: 15, backgroundColor: "#f9f9f9", borderRadius: 10, borderWidth: 1, borderColor: "#ddd" },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 16 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 14, color: "#666", marginBottom: 10 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: { padding: 8, borderWidth: 1, borderColor: "#b89e6a", borderRadius: 5, marginHorizontal: 5, backgroundColor: "#fff" },
  quantityButtonText: { fontSize: 16, color: "#b89e6a" },
  quantity: { fontSize: 16, fontWeight: "bold" },
  removeButton: { padding: 5, backgroundColor: "#ff6b6b", borderRadius: 5 },
  removeButtonText: { color: "#fff", fontSize: 14 },
  summary: { padding: 15, borderTopWidth: 1, borderColor: "#ccc", marginTop: 20, backgroundColor: "#f4f4f4", flexDirection: "row", justifyContent: "flex-end" },
  summaryTextContainer: { flexDirection: "column", alignItems: "flex-end" },
  summaryText: { fontSize: 16, marginBottom: 5, color: "#333" },
  checkoutButton: { backgroundColor: "#000", paddingVertical: 12, borderRadius: 5, marginTop: 20, alignItems: "center", marginBottom: 20 },
  checkoutButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyText: { fontSize: 18, color: "#999", textAlign: "center", marginTop: 50 },
});

export default CartScreen;
