import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { supabase } from "./supabaseclient";  // Your Supabase client initialization

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Sign up the user using Supabase's signUp method
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      });

      if (error) throw error;

      if (data && data.user) {
        console.log("User signed up:", data.user);
        
        // Step 2: Insert profile data immediately after signup
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            username: username,
            email:data.user.email,
            created_at: new Date(),
          });

        if (profileError) throw profileError;

        console.log("Profile inserted successfully");

        Alert.alert(
          "Success",
          "Account created successfully! Please check your email to confirm your registration."
        );
        navigation.navigate("Login");
      } else {
        throw new Error("User data is incomplete or missing");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.switchText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#b89e6a",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#b89e6a",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
  },
  button: {
    backgroundColor: "#b89e6a",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  switchButton: {
    marginTop: 20,
  },
  switchText: {
    color: "#b89e6a",
    fontSize: 14,
  },
});

export default Signup;

