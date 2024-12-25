import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from './supabaseclient';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { grandTotal } = route.params;
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const handlePlaceOrder = async () => {
    if (!fullName || !address || !contact) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    try {
      const items = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { data, error } = await supabase
        .from('ordertable')
        .insert([
          {
            user_id: user?.id,
            full_name: fullName,
            address: address,
            contact: contact,
            total_amount: grandTotal,
            payment_method: 'Cash',
            items: items,
          },
        ]);

      if (error) {
        throw error;
      }

      clearCart();

      Alert.alert(
        'Order Placed',
        "Your order has been placed successfully! You'll receive it in 45 minutes.",
        [{ text: 'OK', onPress: () => navigation.navigate('Homepage') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
      console.error('Error placing order:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />
        <Text style={styles.totalText}>Total Bill: Rs {grandTotal.toFixed(2)}</Text>
        <Text style={styles.paymentMethod}>Payment Method: Cash</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethod: {
    fontSize: 16,
    marginBottom: 20,
  },
  placeOrderButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;

