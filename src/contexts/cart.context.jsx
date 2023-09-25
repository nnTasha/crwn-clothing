import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const itemExist = cartItems.some(
    (cartItem) => cartItem.id === productToAdd.id
  );

  const updatedCardItem = itemExist
    ? cartItems.map((item) => {
        return item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      })
    : [...cartItems, { ...productToAdd, quantity: 1 }];

  return updatedCardItem;
};

const removeCartItem = (cartItems, itemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.find((item) => item.id !== itemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const sumItems = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  return totalItems;
};

const clearCartItem = (cartItems, itemToRemove) =>
  cartItems.filter((item) => item.id !== itemToRemove.id);

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  sumItems: null,
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    sumItems(cartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
    sumItems(cartItems);
  };

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  };

  const totalItemsNum = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const value = {
    isCartOpen,
    cartItems,
    totalItemsNum,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
