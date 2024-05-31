import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Link,
} from '@mui/material';
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
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: '#F1E5D1',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          Login
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: '100%' }}
        >
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/signup" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
