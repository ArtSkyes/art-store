import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { useUserStore } from '../store/userStore';
import { useCartStore } from '../store/cartStore';

export function useAuth() {
  const navigate = useNavigate();
  const { user, setUser, clearUser } = useUserStore();
  const fetchCart = useCartStore((state) => state.fetchCart);
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id ?? '';
      setUser(session?.user ?? null);
      if (userId) {
        fetchCart(userId);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user?.id ?? '';
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') {
        if (userId) {
          fetchCart(userId);
        }
      }
      if (event === 'SIGNED_OUT') {
        resetCart();
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, setUser, fetchCart, resetCart]);

  const signOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    resetCart();
    navigate('/login');
  };

  return { user, signOut };
}
