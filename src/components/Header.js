import React, { useState } from 'react';
import window from 'global';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import makeStyles from '@material-ui/styles/makeStyles';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import Brand from 'components/Brand';
import links from '../links';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    backgroundColor: theme.palette.grey['100'],
    zIndex: theme.zIndex.drawer + 1,
  },
  nav: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  toolbar: theme.mixins.toolbar,
  leftNavBar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  rightNavBar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  tab: {
    minWidth: theme.spacing(8),
  },
}));

export default function Header() {
  const classes = useStyles();
  const { t } = useTranslation('base');
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAppBarClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const leftNavBar = (
    <nav className={classes.leftNavBar}>
      <Tabs value={value} onChange={handleChange}>
        {links.map((link) => (
          <Tab
            className={classes.tab}
            component={Link}
            to={link.to}
            label={t(link.text)}
          />
        ))}
      </Tabs>
    </nav>
  );
  const rightNavBar = (
    <nav className={classes.rightNavBar}>
      <IconButton
        color="inherit"
        href="https://github.com/holymass"
        target="_blank"
        aria-label="Github"
      >
        <Icon path={mdiGithub} size={1} />
      </IconButton>
    </nav>
  );
  return (
    <div className={classes.root}>
      <Hidden smDown implementation="css">
        <AppBar className={classes.appBar} onDoubleClick={handleAppBarClick}>
          <Toolbar>
            <Brand />
            <div className={classes.nav}>
              {leftNavBar}
              {rightNavBar}
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar} />
      </Hidden>
    </div>
  );
}
