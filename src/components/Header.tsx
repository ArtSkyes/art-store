import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { useUserStore } from '../store/userStore';
import { useCart } from '../hooks/useCart';
import { supabase } from '../config/supabaseClient';

const Header: React.FC = () => {
  const { user, clearUser } = useUserStore();
  const { cartItems } = useCart();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Art Store
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItems.length} color="secondary">
            Cart
          </Badge>
        </Button>
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: '10px' }}>
              User ID: {user.id}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
