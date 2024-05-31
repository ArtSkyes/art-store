import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F1E5D1',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#987070',
        },
      },
    },
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#C39898',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#987070',
        },
      },
    },
  },
});

export default theme;
