import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../config/supabaseClient';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  fetchCart: (user_id: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: async (product) => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) return;

        const existingItem = get().cart.find(
          (i) => i.product_id === product.id,
        );
        if (existingItem) {
          const updatedCart = get().cart.map((i) =>
            i.product_id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
          set({ cart: updatedCart });

          const { error } = await supabase
            .from('carts')
            .update({ quantity: existingItem.quantity + 1 })
            .eq('user_id', user.id)
            .eq('product_id', product.id);

          if (error) {
            console.error(error);
          }
        } else {
          const newItem: CartItem = {
            id: crypto.randomUUID(),
            user_id: user.id,
            product_id: product.id,
            title: product.name,
            image: product.imageurl,
            price: product.price,
            quantity: 1,
          };
          set({ cart: [...get().cart, newItem] });

          const { error } = await supabase.from('carts').insert([newItem]);

          if (error) {
            console.error(error);
          }
        }
      },
      removeFromCart: async (id) => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) return;

        set({ cart: get().cart.filter((item) => item.id !== id) });

        const { error } = await supabase
          .from('carts')
          .delete()
          .eq('user_id', user.id)
          .eq('id', id);

        if (error) {
          console.error(error);
        }
      },
      clearCart: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (user) {
          const { error } = await supabase
            .from('carts')
            .delete()
            .eq('user_id', user.id);

          if (error) {
            console.error(error);
          }
        }
        set({ cart: [] });
      },
      fetchCart: async (user_id) => {
        const { data, error } = await supabase
          .from('carts')
          .select('*')
          .eq('user_id', user_id);

        if (error) {
          console.error(error);
          return;
        }

        set({ cart: data });
      },
    }),
    { name: 'cart-store' },
  ),
);
