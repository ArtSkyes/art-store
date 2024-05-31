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
import { SignUpSchema, SignUpSchemaType } from '../types/index';

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });
  const setUser = useUserStore((state) => state.setUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            password: data.password,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (user) {
        setUser(user);
        setSuccessMessage(
          'Sign up successful! Please check your email to confirm your account.',
        );
      }
    } catch (error: any) {
      if (error.message.includes('Email rate limit exceeded')) {
        setErrorMessage('Too many requests. Please try again later.');
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
          Sign Up
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
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
            Sign Up
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" variant="body2">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
