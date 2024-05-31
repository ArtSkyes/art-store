import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  return (
    <Grid display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Footer />
    </Grid>
  );
};

export default MainLayout;
