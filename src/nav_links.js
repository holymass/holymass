import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import RoomIcon from '@material-ui/icons/Room';

export const navLinks = [{
  to: '/missa',
  icon: <StarIcon />,
  text: 'Missa',
}, {
  to: '/churches',
  icon: <RoomIcon />,
  text: 'Churches',
}];
