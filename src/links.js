import React from 'react';
import Icon from '@mdi/react';
import { mdiAppleAirplay, mdiChristianity, mdiCog } from '@mdi/js';

export default [
  {
    to: '/masses',
    icon: <Icon path={mdiAppleAirplay} size={1} />,
    text: 'Masses',
  },
  {
    to: '/churches',
    icon: <Icon path={mdiChristianity} size={1} />,
    text: 'Churches',
  },
  {
    to: '/settings',
    icon: <Icon path={mdiCog} size={1} />,
    text: 'Settings',
  },
];
