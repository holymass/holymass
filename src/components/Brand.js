import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import getMetadata from '../getMetadata';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
}));

export default function Brand(props) {
  const { className: classNameProp, color, ...rest } = props;
  const classes = useStyles();
  const className = classNames(classes.root, classNameProp);
  return (
    <Link className={className} to="/" {...rest}>
      <Typography color={color} variant="h6">
        {getMetadata('brand')}
      </Typography>
    </Link>
  );
}

Brand.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

Brand.defaultProps = {
  className: undefined,
  color: undefined,
};
