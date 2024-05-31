import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          maxWidth: 345,
          margin: '20px auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: 200,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          textAlign: 'center',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '16px',
          marginBottom: '16px',
        },
      },
    },
  },
});

export default theme;
