import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ThankYouPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography sx={{ textAlign: 'center' }} variant="body1">
          Your order has been placed successfully. We appreciate your business!
        </Typography>
      </Box>
    </Container>
  );
};

export default ThankYouPage;
