import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { useUserStore } from '../store/userStore';

export function useAuth() {
  const navigate = useNavigate();
  const { user, setUser, clearUser } = useUserStore();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_IN') navigate('/');
        if (event === 'SIGNED_OUT') navigate('/login');
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, setUser]);

  const signOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    navigate('/login');
  };

  return { user, signOut };
}
