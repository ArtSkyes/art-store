import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  SvgIcon,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useCartStore } from '../store/cartStore';
import { Brush } from '@mui/icons-material';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const cart = useCartStore((state) => state.cart);

  return (
    <AppBar position="static">
      <Toolbar sx={{ color: '#F1E5D1' }}>
        <SvgIcon color="inherit" sx={{ fontSize: 35, mr: 1, color: '#F1E5D1' }}>
          <Brush />
        </SvgIcon>
        <Typography variant="h4" style={{ flexGrow: 1, color: '#F1E5D1' }}>
          <strong> Art </strong>Store
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <Badge
            badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)}
            color="secondary"
          >
            Cart
          </Badge>
        </Button>
        {user ? (
          <>
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
