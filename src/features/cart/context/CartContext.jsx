import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product, quantity = 1) => {
  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  let updatedCart;

  if (existingItem) {
    updatedCart = cartItems.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item
    );
  } else {
    updatedCart = [
      ...cartItems,
      {
        ...product,
        quantity,
      },
    ];
  }

  saveCart(updatedCart);
};

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== productId
    );

    saveCart(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity }
        : item
    );

    saveCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;