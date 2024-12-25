import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";

const LocationSelector = ({ navigation, setSelectedCity }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [options] = useState(["Faisalabad", "Lahore", "Karachi", "Islamabad", "Peshawar"]);

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setSelectedCity(location); // Update the state in App.js
    setModalVisible(false);

    // Navigate to Homepage
    navigation.navigate("Homepage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Location:</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          {selectedLocation ? selectedLocation : "Select"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#b89e6a",
    borderRadius: 4,
    width: "80%",
    backgroundColor: "#f8f8f8",
    padding: 8,
  },
  selectedText: {
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "50%",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
});

export default LocationSelector;
