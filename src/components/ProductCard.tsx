import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  IconButton,
} from '@mui/material';
import { Product } from '../types/product';
import { useCart } from '../hooks/useCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card sx={{ backgroundColor: '#C39898' }}>
        <CardMedia
          component="img"
          image={product.imageurl}
          alt={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            textAlign="center"
            fontWeight={500}
            mb={1}
            variant="h5"
            component="div"
          >
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={1}>
            {product.description}
          </Typography>
          <Typography variant="h6" color="textPrimary">
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <IconButton onClick={handleOpenModal}>
            <VisibilityIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Button
            variant="contained"
            onClick={() => addToCart(product)}
            sx={{ textAlign: 'center' }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <ProductModal
        product={product}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProductCard;
