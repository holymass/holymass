import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/styles/makeStyles';
import GitHubIcon from 'mdi-material-ui/GithubCircle';
import MenuIcon from 'mdi-material-ui/Menu';
import SettingsIcon from 'mdi-material-ui/Settings';
import Brand from 'components/brand';
import Footer from 'components/footer';
import links from '../links';
import {getMetadata} from '../utils';

const drawerWidth = getMetadata('drawer.width');
const useStyles = makeStyles((theme) => ({
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
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  'drawerPaper': {
    width: drawerWidth,
  },
}));


export default function Header() {
  const classes = useStyles();
  const {t} = useTranslation('base');
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div className={classes.drawer}>
      <nav>
        <div className={classes.drawerHeader}>
          {mobileOpen ? (<Brand />) : null}
        </div>
        <Divider />
        <List>
          {links.map((link, key) =>
            <ListItem
              button
              component={Link}
              key={key}
              onClick={handleDrawerToggle}
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
            onClick={handleDrawerToggle}
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
                onClick={handleDrawerToggle}
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
          onClose={handleDrawerToggle}
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
