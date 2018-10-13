import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    'color': theme.palette.text.primary,
    'textDecoration': 'none',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
});

@withStyles(styles)
export default class Action extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  render() {
    const {children, className: classNameProp, classes, ...others} = this.props;
    const className = classNames(
        classes.root,
        classNameProp,
    );
    return (
      <a className={className} {...others}>
        {children}
      </a>
    );
  }
}
