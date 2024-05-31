import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../config/supabaseClient';
import { useUserStore } from '../store/userStore';
import { useCartStore } from '../store/cartStore';
import { LoginSchema, LoginSchemaType } from '../types/index';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const setUser = useUserStore((state) => state.setUser);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    setErrorMessage(null);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        setUser(user);
        fetchCart(user.id);
        navigate('/');
      }
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage(error.message);
      }
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register('email')}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
