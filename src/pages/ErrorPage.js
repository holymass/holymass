import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

export default function ErrorPage(props) {
  const { code, message } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" gutterBottom align="center">
        {code}
      </Typography>
      <Typography variant="h2" gutterBottom align="center">
        {message}
      </Typography>
    </div>
  );
}

ErrorPage.propTypes = {
  code: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
