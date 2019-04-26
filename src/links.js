import React from 'react';
import AirplayIcon from 'mdi-material-ui/Airplay';
import ChristianityIcon from 'mdi-material-ui/Christianity';

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
];
