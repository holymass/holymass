'use client';
import { grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
  typography: {
    fontFamily: '-apple-system, "Microsoft YaHei", "Open Sans", sans-serif',
  },
});

export default responsiveFontSizes(theme);
