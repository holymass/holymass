import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MassList from 'components/mass_list';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
});

@withStyles(styles)
export default class HomeModule extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <MassList showNext />
      </div>
    );
  }
}
