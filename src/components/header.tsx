import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

const styles = createStyles({
  flex: {
    flex: 1
  },
});

export interface HeaderProps extends WithStyles<typeof styles> {
  brand: string;
}

class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { classes, brand } = this.props;
    const brandComponent = (
      <Typography variant='title' align='center'>
      {brand}
      </Typography>
    );
    return (
      <AppBar position='static'>
        <Toolbar>
          <IconButton color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <div className={classes.flex}>
            <Hidden smDown implementation='css'>
              {brandComponent}
            </Hidden>
          </div>
          <IconButton color='inherit' aria-label='Search'>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
