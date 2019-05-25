import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from 'mdi-material-ui/Settings';
import links from '../links';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    bottom: 0,
    position: 'fixed',
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  const { t } = useTranslation('base');
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      showLabels
      className={classes.root}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    >
      {links.map((link) => (
        <BottomNavigationAction
          component={Link}
          to={link.to}
          label={t(link.text)}
          icon={link.icon}
        />
      ))}
      <BottomNavigationAction
        component={Link}
        to="/settings"
        label={t('Settings')}
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}
