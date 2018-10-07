import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {navLinks} from '../nav_links.js';
import {getMetadata} from '../utils';
import SearchBar from './search_bar';

const styles = (theme) => ({
  'root': {
  },
  'brandLink': {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
  'nav': {
    flex: 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  'drawerHeader': {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    height: theme.spacing.unit * 7,
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  'drawerNav': {
    width: theme.spacing.unit * 30,
  },
  '@media (min-width: 600px)': {
    drawerHeader: {
      height: theme.spacing.unit * 8,
    },
  },
});

@withNamespaces('base')
@withStyles(styles)
export default class Header extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

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
    const {className, classes, t} = this.props;
    const brand = getMetadata('brand');
    return (
      <AppBar position='static' className={classNames(classes.root, className)}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Menu'
            onClick={this.handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Hidden className={classes.nav} smDown implementation='css'>
            <Link
              className={classes.brandLink}
              to='/'
            >
              <Typography color='inherit' variant='title'>
                {brand}
              </Typography>
            </Link>
          </Hidden>
          <SearchBar />
        </Toolbar>
        <Drawer
          anchor='left'
          open={this.state.open}
          onClose={this.handleDrawerClose}
        >
          <Paper square className={classes.drawerHeader}>
            <Link
              className={classes.brandLink}
              onClick={this.handleDrawerClose}
              to='/'
            >
              <Typography color='inherit' variant='title'>
                {brand}
              </Typography>
            </Link>
            <IconButton color='inherit' onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Paper>
          <nav className={classes.drawerNav}>
            <List>
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
                  <ListItemText primary={t(link.text)} />
                </ListItem>
              )}
            </List>
            <Divider />
            <List>
              <ListItem
                button
                component={Link}
                onClick={this.handleDrawerClose}
                to='/settings'
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={t('Settings')} />
              </ListItem>
            </List>
          </nav>
        </Drawer>
      </AppBar>
    );
  }
}
