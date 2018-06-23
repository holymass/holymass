import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

const styles = createStyles({
  flex: {
    flex: 1
  },
});

export interface HeaderProps extends WithStyles<typeof styles> {
  brand: string;
  leftLinks?: any;
  rightLinks?: any;
}

class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { classes, brand, leftLinks, rightLinks } = this.props;
    const brandComponent = (
      <Button className='title'>
        {brand}
      </Button>
    );
    return (
      <AppBar>
        <Toolbar>
          {leftLinks !== undefined ? brandComponent : undefined}
          <div className={classes.flex}>
            <Hidden smDown implementation='css'>
              {leftLinks !== undefined ? (
                <Hidden smDown implementation='css'>
                  {leftLinks}
                </Hidden>
              ) : brandComponent}
            </Hidden>
          </div>
          <Hidden smDown implementation='css'>
            {rightLinks}
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
