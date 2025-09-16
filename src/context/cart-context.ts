import { createContext } from "react";
import type { Product } from "@/types";

export type CartItem = Product & { quantity: number };

export type CartContextValue = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);


