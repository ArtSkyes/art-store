import { supabase } from '../config/supabaseClient';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';
import { toast } from 'react-toastify';

export const useSupabaseCart = () => {
  const getSession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      return null;
    }
    return session?.user;
  };

  const addToCart = async (
    product: Product,
    cart: CartItem[],
    setCart: (cart: CartItem[]) => void,
  ) => {
    const user = await getSession();
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    const existingItem = cart.find((i) => i.product_id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((i) =>
        i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      setCart(updatedCart);

      const { error } = await supabase
        .from('carts')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('user_id', user.id)
        .eq('product_id', product.id);

      if (error) {
        console.error(error);
      } else {
        toast.success('Item added to cart', { position: 'bottom-left' });
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
      setCart([...cart, newItem]);

      const { error } = await supabase.from('carts').insert([newItem]);

      if (error) {
        console.error(error);
      } else {
        toast.success('Item added to cart', { position: 'bottom-left' });
      }
    }
  };

  const removeFromCart = async (
    id: string,
    cart: CartItem[],
    setCart: (cart: CartItem[]) => void,
  ) => {
    const user = await getSession();
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    setCart(cart.filter((item) => item.id !== id));

    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('user_id', user.id)
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      toast.success('Item removed from cart', { position: 'bottom-left' });
    }
  };

  const clearCart = async (setCart: (cart: CartItem[]) => void) => {
    const user = await getSession();
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error(error);
    } else {
      setCart([]);
      toast.success('Cart cleared', { position: 'bottom-left' });
    }
  };

  const fetchCart = async (
    user_id: string,
    setCart: (cart: CartItem[]) => void,
  ) => {
    const { data, error } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error(error);
      return;
    }

    setCart(data);
  };

  const updateCartItemQuantity = async (
    id: string,
    quantity: number,
    cart: CartItem[],
    setCart: (cart: CartItem[]) => void,
  ) => {
    const user = await getSession();
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCart(updatedCart);

    const { error } = await supabase
      .from('carts')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      toast.success('Item quantity updated', { position: 'bottom-left' });
    }
  };

  return {
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
    updateCartItemQuantity,
  };
};
