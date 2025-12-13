'use client';
import { blue, grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: grey[900],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: blue[600],
        },
      },
    },
  },
  typography: {
    fontFamily: '-apple-system, "Microsoft YaHei", "Open Sans", sans-serif',
  },
});

export default responsiveFontSizes(theme);
