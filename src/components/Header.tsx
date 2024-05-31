import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useCartStore } from '../store/cartStore';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const cart = useCartStore((state) => state.cart);

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
          <Badge badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
            Cart
          </Badge>
        </Button>
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: '10px' }}>
              User ID: {user.id}
            </Typography>
            <Button color="inherit" onClick={signOut}>
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
