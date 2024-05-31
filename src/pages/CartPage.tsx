import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, clearCart, removeFromCart, updateCartItemQuantity } =
    useCartStore();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [cart]);

  const handleCheckout = () => {
    clearCart();
    navigate('/thank-you');
  };

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };

  const handleEdit = (id: string) => {
    setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleSave = (id: string) => {
    updateCartItemQuantity(id, quantities[id]);
    setEditMode((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={clearCart}>
          Clear Cart
        </Button>
      </Box>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={1}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 1,
                    width: '100%',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, objectFit: 'contain' }}
                    image={item.image}
                    alt={item.title}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      {editMode[item.id] ? (
                        <TextField
                          type="number"
                          value={quantities[item.id] ?? item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value),
                            )
                          }
                          inputProps={{ min: 1 }}
                          sx={{ width: 60 }}
                        />
                      ) : (
                        <Typography variant="body2">
                          Quantity: {item.quantity}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        Price: ${item.price}
                      </Typography>
                      <Typography variant="body2">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      flex: 1,
                    }}
                  >
                    <CardContent>
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                      {editMode[item.id] ? (
                        <IconButton onClick={() => handleSave(item.id)}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleEdit(item.id)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" align="right" mt={4}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
