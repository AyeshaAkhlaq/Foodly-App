import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LocationSelector from "./LocationSelector";
import Homepage from "./Homepage";
import LogoScreen from "./LogoScreen";
import Login from "./login";
import Signup from "./Signup";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Orders from "./Orders";
import CakeScreen from "./CakeScreen";
import BrownieScreen from "./BrownieScreen";
import SundaeScreen from "./SundaeScreen";
import CartScreen from "./CartScreen";
import Search from "./Search";
import AboutUs from "./AboutUs";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import Sidebar from "./Sidebar";
import CheckoutScreen from "./CheckoutScreen";

const Stack = createStackNavigator();

const App = () => {
  const [location, setLocation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ScreenWithNavAndFooter = ({ children, navigation, city }) => (
    <View style={styles.screenContainer}>
      <NavBar 
        city={city} 
        navigation={navigation} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
      />
      <View style={styles.content}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navigation={navigation} />
        {children}
      </View>
      <Footer navigation={navigation} />
    </View>
  );

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LogoScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LogoScreen" component={LogoScreen} />
            <Stack.Screen name="LocationSelector">
              {(props) => (
                <LocationSelector {...props} setSelectedCity={setLocation} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Homepage">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <Homepage {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <Login {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <Signup {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="Orders">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <Orders {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="CakeScreen">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <CakeScreen {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="BrownieScreen">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <BrownieScreen {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="SundaeScreen">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <SundaeScreen {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="CartScreen">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <CartScreen {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <Search {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="AboutUs">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <AboutUs {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
            <Stack.Screen name="Checkout">
              {(props) => (
                <ScreenWithNavAndFooter navigation={props.navigation} city={location}>
                  <CheckoutScreen {...props} />
                </ScreenWithNavAndFooter>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;

