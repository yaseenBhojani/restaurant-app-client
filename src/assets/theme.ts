import { createTheme } from '@mui/material/styles';

// Create a custom theme using MUI's `createTheme` function
export const theme = createTheme({
  palette: {
    // Define the color palette for the theme
    primary: {
      main: '#fe7f32',
    },
    secondary: {
      main: '#181f2e',
    },
    error: {
      main: '#ff0000',
    },
  },
  components: {
    // Override styles for MUI components
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
});
