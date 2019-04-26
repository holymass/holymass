import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 56px)',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: 'calc(100vh - 48px)',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
    },
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));

export default function Main(props) {
  const { children } = props;
  const classes = useStyles();
  return <main className={classes.root}>{children}</main>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
