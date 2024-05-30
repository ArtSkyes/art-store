import { create } from 'zustand';
import { Product } from '../types/product';

interface CartState {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (product) => set((state) => ({ cartItems: [...state.cartItems, product] })),
  removeFromCart: (productId) => set((state) => ({ cartItems: state.cartItems.filter(item => item.id !== productId) })),
  clearCart: () => set({ cartItems: [] }),
}));
