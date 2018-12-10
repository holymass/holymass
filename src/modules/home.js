import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Sidebar from 'components/sidebar';
import MassList from 'components/mass_list';
import SetLanguage from 'components/forms/set_language';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
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
        <Sidebar>
          <SetLanguage />
        </Sidebar>
      </div>
    );
  }
}
