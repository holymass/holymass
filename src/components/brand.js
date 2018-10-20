import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {getMetadata} from '../utils';

const styles = (theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
});

@withStyles(styles)
export default class Brand extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    const {className: classNameProp, classes, color, ...others} = this.props;
    const className = classNames(
        classes.root,
        classNameProp,
    );
    return (
      <Link className={className} to='/' {...others}>
        <Typography color={color} variant='h6'>
          {getMetadata('brand')}
        </Typography>
      </Link>
    );
  }
}
