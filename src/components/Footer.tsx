// src/components/Footer.tsx
import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}
          Art Store {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
