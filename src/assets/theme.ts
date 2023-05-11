import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
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
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
});
