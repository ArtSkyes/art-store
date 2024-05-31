import React from 'react';
import { Modal, Box, Typography, CardMedia, Button } from '@mui/material';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  open,
  onClose,
}) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#C39898',
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}
      >
        <CardMedia
          component="img"
          image={product.imageurl}
          alt={product.name}
          sx={{ height: 200, objectFit: 'contain', mb: 2 }}
        />
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          fontWeight={600}
          mb={1}
        >
          {product.name}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          gutterBottom
          textAlign="center"
          mb={1}
        >
          {product.description}
        </Typography>
        <Typography
          variant="h6"
          color="textPrimary"
          gutterBottom
          textAlign="center"
        >
          ${product.price}
        </Typography>
        <Box display="flex" justifyContent="center" mt={1}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
