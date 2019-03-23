import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
  },
  typography: {
    fontSize: 12.25,
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Open Sans", sans-serif',
    useNextVariants: true,
  },
});
