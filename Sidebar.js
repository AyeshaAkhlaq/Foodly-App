import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navigation }) => {
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  const branches = [
    { city: "Islamabad", address: "123 Blue Area, Islamabad, 44000" },
    { city: "Lahore", address: "456 Liberty Market, Lahore, 54000" },
    { city: "Peshawar", address: "789 Saddar Road, Peshawar, 25000" },
    { city: "Multan", address: "101 Cantt Area, Multan, 60000" },
  ];

  const toggleContactDropdown = () => setIsContactDropdownOpen(!isContactDropdownOpen);
  const toggleMenuDropdown = () => setIsMenuDropdownOpen(!isMenuDropdownOpen);

  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
    onClose();
  };

  const handleCategoryClick = (category: string) => {
    if (category === "Cakes") {
      navigateTo("CakeScreen");
    } else if (category === "Brownies") {
      navigateTo("BrownieScreen");
    } else if (category === "Sundaes") {
      navigateTo("SundaeScreen");
    }
  };

  const renderMenuItem = useCallback(({ item }) => {
    switch (item.type) {
      case 'link':
        return (
          <TouchableOpacity onPress={() => navigateTo(item.screen)} style={styles.sidebarItem}>
            <Text style={styles.sidebarText}>{item.title}</Text>
          </TouchableOpacity>
        );
      case 'dropdown':
        return (
          <>
            <TouchableOpacity onPress={item.onPress} style={styles.sidebarItem}>
              <Text style={styles.sidebarText}>{item.title} {item.isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {item.isOpen && item.content}
          </>
        );
      default:
        return null;
    }
  }, []);

  const menuItems = [
    { type: 'link', title: 'Home', screen: 'Homepage' },
    {
      type: 'dropdown',
      title: 'Menu',
      isOpen: isMenuDropdownOpen,
      onPress: toggleMenuDropdown,
      content: (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => handleCategoryClick("Cakes")} style={styles.subMenuItem}>
            <Image source={require("./assets/ChocolateFudge.png")} style={styles.categoryImage} />
            <Text style={styles.subMenuText}>Cakes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryClick("Brownies")} style={styles.subMenuItem}>
            <Image source={require("./assets/brownies.png")} style={styles.categoryImage} />
            <Text style={styles.subMenuText}>Brownies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryClick("Sundaes")} style={styles.subMenuItem}>
            <Image source={require("./assets/nutellasundae.png")} style={styles.categoryImage} />
            <Text style={styles.subMenuText}>Sundaes</Text>
          </TouchableOpacity>
        </View>
      )
    },
    { type: 'link', title: 'Your Orders', screen: 'Orders' },
    { type: 'link', title: 'About Us', screen: 'AboutUs' },
    {
      type: 'dropdown',
      title: 'Locate Us',
      isOpen: isContactDropdownOpen,
      onPress: toggleContactDropdown,
      content: (
        <View style={styles.subMenu}>
          {branches.map((branch, index) => (
            <View key={index} style={styles.branch}>
              <Text style={styles.branchCity}>{branch.city}</Text>
              <Text style={styles.branchAddress}>{branch.address}</Text>
            </View>
          ))}
        </View>
      )
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.sidebar}>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 20,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  sidebarItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarText: {
    fontSize: 18,
    color: '#333',
  },
  subMenu: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  subMenuText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  branch: {
    marginBottom: 12,
  },
  branchCity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  branchAddress: {
    fontSize: 14,
    color: '#555',
  },
});

export default Sidebar;

