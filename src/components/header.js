import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from 'mdi-material-ui/GithubCircle';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Brand from 'components/brand';
import Footer from 'components/footer';
import navLinks from '../nav_links';
import {getMetadata} from '../utils';

const drawerWidth = getMetadata('drawer.width');
const styles = (theme) => ({
  'root': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  'appBar': {
    zIndex: theme.zIndex.drawer + 1,
  },
  'nav': {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  'toolbar': theme.mixins.toolbar,
  'drawer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  'drawerHeader': {
    ...theme.mixins.toolbar,
    alignItems: 'center',
    display: 'flex',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  'drawerPaper': {
    width: drawerWidth,
  },
});


@withNamespaces('base')
@withStyles(styles)
export default class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen}
    ));
  };

  render() {
    const {classes, t} = this.props;
    const {mobileOpen} = this.state;
    const drawer = (
      <div className={classes.drawer}>
        <nav>
          <div className={classes.drawerHeader}>
            {mobileOpen ? (<Brand />) : null}
          </div>
          <Divider />
          <List>
            {navLinks.map((link, key) =>
              <ListItem
                button
                component={Link}
                key={key}
                onClick={this.handleDrawerToggle}
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
              onClick={this.handleDrawerToggle}
              to='/settings'
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('Settings')} />
            </ListItem>
          </List>
        </nav>
        <Footer />
      </div>
    );
    return (
      <div className={classes.root}>
        <div className={classes.toolbar} />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <div className={classes.nav}>
              <Hidden mdUp implementation='css'>
                <IconButton
                  color='inherit'
                  aria-label='Menu'
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Hidden smDown implementation='css'>
                <Brand color='inherit' />
              </Hidden>
            </div>
            <IconButton
              color='inherit'
              href='https://github.com/iannar'
              target='_blank'
              aria-label='Github'
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.handleDrawerToggle}
            open={mobileOpen}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}
