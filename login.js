import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useAuth } from "./AuthContext";  // Import useAuth hook
import { supabase } from "./supabaseclient";  // Your Supabase client initialization

const Login = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn, logout,user } = useAuth();  // Access AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { user } = data;
      if (!user) throw new Error("No user returned from login");

      await fetchProfile(user.id);
      setIsLoggedIn(true);  // Update context to reflect the logged-in state
      Alert.alert("Login Successful", "Welcome back!");
    } catch (error) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile from the "profiles" table
  const fetchProfile = async (userId) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      setProfile(data);
    } catch (error) {
      Alert.alert("Error fetching profile", error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();  // Logout using the context
      setProfile(null);
      setEmail("");
      setPassword("");
      Alert.alert("Logged out", "You have been logged out.");
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // If the user is already logged in, fetch their profile
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          await fetchProfile(session.user.id);
          setIsLoggedIn(true);  // Set the user as logged in
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setIsLoggedIn]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#b89e6a" />
      </View>
    );
  }

  // If logged in, show profile and logout
  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        {profileLoading ? (
          <ActivityIndicator size="large" color="#b89e6a" />
        ) : (
          <>
            <Text style={styles.title}>Welcome, {profile?.username || "User"}!</Text>
            <Text style={styles.profileText}>Email: {profile?.email}</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>LOG OUT</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  // Login form if not logged in
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Log In"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
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
  profileText: {
    fontSize: 18,
    marginTop: 10,
    color: "#333",
  },
});

export default Login;
