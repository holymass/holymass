import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {navLinks} from '../nav.js';
import SearchBarContainer from './search_bar_container';

const styles = (theme) => ({
  root: {
  },
  flex: {
    flex: 1,
  },
  list: {
    width: theme.spacing.unit * 30,
  },
});

class Header extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({open: true});
  }

  handleDrawerClose = () => {
    this.setState({open: false});
  }

  render() {
    const {classes, brand} = this.props;
    return (
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Menu'
            onClick={this.handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.flex}>
            <Hidden smDown implementation='css'>
              <Typography color='inherit' variant='title'>
                {brand}
              </Typography>
            </Hidden>
          </div>
          <SearchBarContainer />
        </Toolbar>
        <Drawer
          anchor='left'
          open={this.state.open}
          onClose={this.handleDrawerClose}
        >
          <List className={classes.list} component='nav'>
            <ListItem
              button
              component={Link}
              onClick={this.handleDrawerClose}
              to='/'
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={brand} />
            </ListItem>
            <Divider />
            {navLinks.map((link, key) =>
              <ListItem
                button
                component={Link}
                key={key}
                onClick={this.handleDrawerClose}
                to={link.to}
              >
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItem>
            )}
            <Divider />
            <ListItem
              button
              component={Link}
              onClick={this.handleDrawerClose}
              to='/settings'
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
            <ListItem
              button
              component={Link}
              onClick={this.handleDrawerClose}
              to='/feedback'
            >
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary='Send Feedback' />
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  brand: PropTypes.string,
};

export default withStyles(styles)(Header);
