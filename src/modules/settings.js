import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ChangeLanguage from '../components/settings/change_language';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
});

class SettingsPage extends React.Component {
  state = {
    value: 'female',
  };

  handleLanguageChange = (event) => {
    this.setState({value: event.target.value});
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

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsPage);
