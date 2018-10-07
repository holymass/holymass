import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ChangeLanguage from '../components/form/change_language';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
});

@withStyles(styles)
export default class SettingsModule extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <ChangeLanguage />
      </div>
    );
  }
}
