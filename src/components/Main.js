import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    overflowX: 'hidden',
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
