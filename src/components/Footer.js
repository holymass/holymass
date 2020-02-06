import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import getMetadata from '../getMetadata';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
    zIndex: 2,
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography align="center">
        &copy; {new Date().getFullYear()} {getMetadata('domain')}
      </Typography>
    </footer>
  );
}
