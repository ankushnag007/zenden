import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  useEffect(() => {
    totalSum(carts); // Recalculate total price whenever carts change
  }, [carts]);

  const loadCartItems = async () => {
    try {
      let storedCarts = await AsyncStorage.getItem('carts');
      storedCarts = storedCarts ? JSON.parse(storedCarts) : [];
      setCarts(storedCarts);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const addToCarts = async (item) => {
    try {
      const itemExist = carts.findIndex((cart) => cart.id === item.id);
      if (itemExist === -1) {
        const newCartItems = [...carts, item];
        await AsyncStorage.setItem('carts', JSON.stringify(newCartItems));
        setCarts(newCartItems);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const updateCartItem = async (updatedItem) => {
    try {
      const updatedCarts = carts.map(item =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      );
      setCarts(updatedCarts);
      await AsyncStorage.setItem('carts', JSON.stringify(updatedCarts));
      totalSum(updatedCarts);
    } catch (error) {
      console.error('Error updating item in cart:', error);
    }
  };

  const deletCartItem = async (item) => {
    try {
      const newItems = carts.filter((cart) => cart.id !== item.id);
      setCarts(newItems);
      await AsyncStorage.setItem('carts', JSON.stringify(newItems));
      totalSum(newItems);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const totalSum = (cartItems) => {
    const totalSum = cartItems.reduce((amount, item) => amount + (item.price * (item.quantity || 1)), 0);
    setTotalPrice(totalSum);
  };

  const value = {
    carts,
    addToCarts,
    updateCartItem,
    totalPrice,
    deletCartItem,
  };

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>;
};
