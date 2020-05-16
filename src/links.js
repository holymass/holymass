import React from 'react';
import Icon from '@mdi/react';
import { mdiAlphaA, mdiAlphaB, mdiAlphaC } from '@mdi/js';

export default [
  {
    to: '/masses/year-a',
    icon: <Icon path={mdiAlphaA} size={1} />,
    text: 'Year A',
  },
  {
    to: '/masses/year-b',
    icon: <Icon path={mdiAlphaB} size={1} />,
    text: 'Year B',
  },
  {
    to: '/masses/year-c',
    icon: <Icon path={mdiAlphaC} size={1} />,
    text: 'Year C',
  },
];
