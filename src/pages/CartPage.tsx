import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Container } from '@mui/material';
import { useCart } from '../hooks/useCart';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`$${item.price}`}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
      )}
    </Container>
  );
};

export default CartPage;
