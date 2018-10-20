import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
  },
  typography: {
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Open Sans", sans-serif',
    useNextVariants: true,
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
