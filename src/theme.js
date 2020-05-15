import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import green from '@material-ui/core/colors/green';

export default createMuiTheme({
  palette: {
    primary: {
      ...green,
      main: green['400'],
    },
    secondary: {
      ...green,
      main: green['400'],
    },
  },
  typography: {
    fontSize: 12.25,
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Open Sans", sans-serif',
    useNextVariants: true,
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});
