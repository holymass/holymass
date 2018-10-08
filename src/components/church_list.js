import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
});

@withStyles(styles)
export default class ChurchList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        church
      </div>
    );
  }
}
