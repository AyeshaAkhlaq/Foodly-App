import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext(null);

const imageMap = {
  "ChocolateFudge.png": require("./assets/ChocolateFudge.png"),
  "threemilk.png": require("./assets/threemilk.png"),
  "coffee.png": require("./assets/coffee.png"),
  "redvelvet.png": require("./assets/redvelvet.png"),
  "brownies.png": require("./assets/brownies.png"),
  "caramel.png": require("./assets/caramel.png"),
  "oreo.png": require("./assets/oreo.png"),
  "espresso.png": require("./assets/espresso.png"),
  "nutellabrownie.png": require("./assets/nutellabrownie.png"),
    "galaxysundae.png": require("./assets/galaxysundae.png"),
  "nutellasundae.png": require("./assets/nutellasundae.png"),
  "redvelvetsundae.png": require("./assets/redvelvetsundae.png"),
  "threemilksundae.png": require("./assets/threemilksundae.png"),
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prevItems,
          {
            ...item,
            image: imageMap[item.image] || null,
            quantity: 1,
          },
        ];
      }
    });
  }, []);

  const removeFromCart = useCallback((itemName) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
  }, []);

  const updateQuantity = useCallback((itemName, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === itemName
          ? { ...item, quantity: Math.max(item.quantity + change, 0) }
          : item
      ).filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

