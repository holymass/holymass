import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import RoomIcon from '@material-ui/icons/Room';

export const navLinks = [{
  to: '/mass',
  icon: <StarIcon />,
  text: 'Mass',
}, {
  to: '/church',
  icon: <RoomIcon />,
  text: 'Church',
}];
