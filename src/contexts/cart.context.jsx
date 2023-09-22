import { createContext, useState } from 'react';

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

const sumItems = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  return totalItems;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  sumItems: null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    sumItems(cartItems);
  };

  const totalItemsNum = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    totalItemsNum,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
