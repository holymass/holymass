import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: orange,
  },
  typography: {
    fontFamily: 'PingFang SC, Microsoft YaHei, STHeiti, Open Sans, sans-serif',
  },
});

export default (Component) => {
  return (props) => { // eslint-disable-line react/display-name
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  };
};
