import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SetLanguage from 'components/forms/set_language';
import SetLiturgicalYear from 'components/forms/set_liturgical_year';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
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
        <SetLanguage />
        <SetLiturgicalYear />
      </div>
    );
  }
}
