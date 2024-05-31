import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#A67B5B',
        color: '#fff',
        py: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          {'© '}
          Art Store {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
