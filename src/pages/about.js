import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BasePage from './base';

const styles = (theme) => ({
  root: {},
});

class AboutPage extends BasePage {
  render() {
    return (
      <div className={this.props.classes.root}>
          iannar.com
      </div>
    );
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPage);
