import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
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
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUpPage;
