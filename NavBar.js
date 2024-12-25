import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';

interface NavBarProps {
  city: string;
  navigation: any;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ city, navigation, toggleSidebar, isSidebarOpen }) => {
  const { width } = Dimensions.get("window");
  const isSmallScreen = width < 375;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <Text style={styles.menuIcon}>{isSidebarOpen ? '✕' : '☰'}</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require("./assets/MamaKitchen.png")} style={[styles.logo, isSmallScreen && styles.smallLogo]} />
      </View>

      <View style={styles.cityContainer}>
        <Text style={styles.cityText}>{city || 'Select City'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  menuButton: {
    zIndex: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  smallLogo: {
    width: 160,
    height: 48,
  },
  cityContainer: {
    marginLeft: 'auto',
  },
  cityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default NavBar;