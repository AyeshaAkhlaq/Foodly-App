import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Footer = ({ navigation }) => {
  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footer}>
        
        <TouchableOpacity onPress={() => navigateTo('Orders')} style={styles.iconButton}>
        <Text style={styles.icon}>📋</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Search')} style={styles.iconButton}>
        <Text style={styles.icon}>🔍</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigateTo('Homepage')} style={styles.homeButton}>
        <Text style={styles.homeIcon}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Login')} style={styles.iconButton}>
        <Text style={styles.icon}>👤</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigateTo('CartScreen')} style={styles.iconButton}>
        <Text style={styles.icon}>🛒</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    fontSize: 24,
  },
  homeButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 30,
    marginTop: -25,
  },
  homeIcon: {
    fontSize: 28,
  },
});

export default Footer;

