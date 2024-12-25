import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("./assets/logo.png")} // Your brand logo
        style={styles.logo}
      />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to [Your Brand Name], where fashion meets quality and comfort.
        We are dedicated to bringing you the latest trends and timeless designs, all
        crafted with the finest materials to ensure durability and style. Our team
        works tirelessly to provide a seamless shopping experience and high-quality
        products.
      </Text>
      <Text style={styles.subTitle}>Our Mission</Text>
      <Text style={styles.text}>
        At [Your Brand Name], we believe in empowering individuals through
        their fashion choices. Our mission is to create affordable, stylish,
        and high-quality products that cater to all your fashion needs.
      </Text>
      <Text style={styles.subTitle}>Our Values</Text>
      <Text style={styles.text}>
        Integrity, customer satisfaction, and sustainability are at the core
        of everything we do. We take pride in our craftsmanship and commitment
        to providing exceptional products that you’ll love.
      </Text>
      <Text style={styles.subTitle}>Join Us on Our Journey</Text>
      <Text style={styles.text}>
        We invite you to join us in our journey toward building a fashion brand
        that speaks to style, comfort, and sustainability. Stay connected with us
        and explore our wide range of products that are sure to leave a lasting
        impression.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    marginLeft: 0, // 3cm left margin
    marginRight: 0, // 3cm right margin
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
    
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#b89e6a", // Customize with your brand color
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#b89e6a",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 24,
  },
});

export default AboutUs;
