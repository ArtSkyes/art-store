import { useCartStore } from '../store/cartStore';
import { Product } from '../types/product';

export const useCart = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const cart = useCartStore((state) => state.cart);

  return {
    addToCart: (product: Product) => addToCart(product),
    removeFromCart: (id: string) => removeFromCart(id),
    clearCart: () => clearCart(),
    cart,
  };
};
