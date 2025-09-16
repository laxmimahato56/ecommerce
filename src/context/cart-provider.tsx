import { useState, useEffect, type PropsWithChildren } from "react";
import type { Product } from "@/types";
import { CartContext, type CartItem } from "./cart-context.ts";

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((previousCartItems) => {
      const existingItem = previousCartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        return previousCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...previousCartItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((previousCartItems) =>
      previousCartItems.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((previousCartItems) => {
      if (quantity <= 0) {
        return previousCartItems.filter((item) => item.id !== id);
      }
      return previousCartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
