import React from 'react';
import AirplayIcon from 'mdi-material-ui/Airplay';
import ChristianityIcon from 'mdi-material-ui/Christianity';
import SettingsIcon from 'mdi-material-ui/Settings';

export default [
  {
    to: '/masses',
    icon: <AirplayIcon />,
    text: 'Masses',
  },
  {
    to: '/churches',
    icon: <ChristianityIcon />,
    text: 'Churches',
  },
  {
    to: '/settings',
    icon: <SettingsIcon />,
    text: 'Settings',
  },
];
