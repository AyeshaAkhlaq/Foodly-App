import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "./AuthContext"; // Import the useAuth hook
import { supabase } from "./supabaseclient"; // Import Supabase client

const Orders = ({ navigation }) => {
  const { isLoggedIn, user } = useAuth(); // Use AuthContext to get the login state and user
  const [orders, setOrders] = useState([]); // State to store the orders
  const [loading, setLoading] = useState(true); // Loading state for orders
  const [ordersFetched, setOrdersFetched] = useState(false); // Flag to prevent multiple fetches

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || ordersFetched) return; // Prevent fetch if orders have already been fetched

      try {
        const { data, error } = await supabase
          .from("ordertable")
          .select("*")
          .eq("user_id", user.id); // Query orders for the logged-in user

        if (error) {
          throw error;
        }

        setOrders(data); // Set orders if data is fetched successfully
        setOrdersFetched(true); // Set the flag to indicate orders have been fetched
      } catch (error) {
        Alert.alert("Error", "Unable to fetch orders. Please try again.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (isLoggedIn && user && !ordersFetched) {
      fetchOrders(); // Fetch orders only if the user is logged in and not already fetched
    }
  }, [isLoggedIn, user, ordersFetched]); // Only re-fetch if login state or user changes

  const handleLogout = () => {
    // Logout logic here
    setOrders([]); // Clear orders on logout
    setOrdersFetched(false); // Reset fetch flag on logout
    Alert.alert("Logged Out", "You have successfully logged out.");
    navigation.navigate("Login"); // Redirect to Login screen
  };

  // If not logged in, prompt to login
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>You need to log in to view your orders.</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If loading orders, show loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading orders...</Text>
      </View>
    );
  }

  // If no orders found
  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No orders found.</Text>
      </View>
    );
  }

  // Display orders if logged in and orders are fetched
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, styles.orderNo]}>No.</Text>
        <Text style={[styles.columnHeader, styles.fullName]}>Full Name</Text>
        <Text style={[styles.columnHeader, styles.items]}>Items</Text>
        <Text style={[styles.columnHeader, styles.totalAmount]}>Total</Text>
        <Text style={[styles.columnHeader, styles.date]}>Date</Text>
      </View>

      <ScrollView contentContainerStyle={styles.tableBody}>
        {/* Order Rows */}
        {orders.map((order, index) => (
          <View key={index} style={styles.orderRow}>
            <Text style={[styles.cell, styles.orderNo]}>{order.id}</Text>
            <Text style={[styles.cell, styles.fullName]}>{order.full_name}</Text>

            {/* Render the items in the order */}
            <View style={[styles.cell, styles.items]}>
              {order.items.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.itemText}>
                  {item.name} - {item.quantity} x {item.price}
                </Text>
              ))}
            </View>

            <Text style={[styles.cell, styles.totalAmount]}>${order.total_amount}</Text>
            <Text style={[styles.cell, styles.date]}>
              {new Date(order.created_at).toLocaleDateString()} {/* Format date */}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#b89e6a",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: "space-between",
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderNo: {
    flex: 1,
    textAlign: "center",
  },
  fullName: {
    flex: 2,
    textAlign: "center",
  },
  items: {
    flex: 3, // Adjusted for multiple items
    textAlign: "center",
    justifyContent: "center",
  },
  totalAmount: {
    flex: 1,
    textAlign: "center",
  },
  date: {
    flex: 1.5,
    textAlign: "center",
  },
  tableBody: {
    marginBottom: 20,
  },
  orderRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
    minHeight: 70, // Increased row height for better readability
  },
  cell: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  itemText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: "#b89e6a",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Orders;
