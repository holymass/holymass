import React from 'react';
import PropTypes from 'prop-types';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {},
});

class ChurchesPage extends React.Component {
  render() {
    const {classes, t} = this.props;
    return (
      <div className={classes.root}>
        {t('Churches')}
      </div>
    );
  }
}

ChurchesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(withNamespaces('churches')(ChurchesPage));
