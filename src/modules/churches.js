import React from 'react';
import PropTypes from 'prop-types';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {},
});

@withNamespaces('churches')
@withStyles(styles)
export default class ChurchesModule extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const {classes, t} = this.props;
    return (
      <div className={classes.root}>
        {t('Churches')}
      </div>
    );
  }
}

