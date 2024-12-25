import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const LogoScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("LocationSelector"); // Navigate to LocationSelector screen after 5 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/logo.png")} // Replace with your logo's path
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
  },
});

export default LogoScreen;
