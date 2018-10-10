import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const styles = (theme) => ({
  root: {
    width: theme.spacing.unit * 40,
  },
});

@withStyles(styles)
export default class Sidebar extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {children, classes} = this.props;
    return (
      <Hidden smDown className={classes.root} implementation='css'>
        {children}
      </Hidden>
    );
  }
}
