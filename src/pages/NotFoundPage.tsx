import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1">
          The page you are looking for does not exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
