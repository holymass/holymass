import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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
  const icp = getMetadata('footer.icp');
  return (
    <footer className={classes.root}>
      <Typography align="center">
        &copy; {new Date().getFullYear()} {getMetadata('domain')}
        <br />
        <Link
          color="textSecondary"
          href="http://www.beian.miit.gov.cn"
          target="_blank"
        >
          {icp}
        </Link>
      </Typography>
    </footer>
  );
}
