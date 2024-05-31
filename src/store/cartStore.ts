import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';
import { useSupabaseCart } from '../hooks/useSupabaseCart';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  fetchCart: (user_id: string) => void;
  resetCart: () => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const {
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        updateCartItemQuantity,
      } = useSupabaseCart();

      return {
        cart: [],
        addToCart: (product) =>
          addToCart(product, get().cart, (cart) => set({ cart })),
        removeFromCart: (id) =>
          removeFromCart(id, get().cart, (cart) => set({ cart })),
        clearCart: () => clearCart((cart) => set({ cart })),
        fetchCart: (user_id) => fetchCart(user_id, (cart) => set({ cart })),
        resetCart: () => set({ cart: [] }),
        updateCartItemQuantity: (id, quantity) =>
          updateCartItemQuantity(id, quantity, get().cart, (cart) =>
            set({ cart }),
          ),
      };
    },
    { name: 'cart-store' },
  ),
);
