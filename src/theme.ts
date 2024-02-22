'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: '-apple-system, "Microsoft YaHei", "Open Sans", sans-serif',
  },
});

export default responsiveFontSizes(theme);
