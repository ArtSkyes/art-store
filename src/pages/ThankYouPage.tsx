import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ThankYouPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography
          sx={{ textAlign: 'center', fontWeight: 600 }}
          variant="h3"
          gutterBottom
        >
          Thank You for <br />
          Your Order!
        </Typography>
        <Typography sx={{ textAlign: 'center' }} variant="h6">
          Your order has been placed successfully. <br />
          We appreciate your business!
        </Typography>
      </Box>
    </Container>
  );
};

export default ThankYouPage;
