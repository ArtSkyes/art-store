// src/pages/HomePage.tsx
import React from 'react';
import { Grid } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <Spinner loading={isLoading} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid container spacing={2}>
      {Array.isArray(products) &&
        products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
    </Grid>
  );
};

export default HomePage;
