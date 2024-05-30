import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { supabase } from '../config/supabaseClient';
import { Product } from '../types/product';
import { useCart } from '../hooks/useCart';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductById = async (id: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProduct(data as Product);
      }
      setIsLoading(false);
    };

    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product?.imageUrl}
          alt={product?.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product?.description}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            ${product?.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart(product!)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductPage;
