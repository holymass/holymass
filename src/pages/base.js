import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {},
});

class BasePage extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
      </div>
    );
  }
}

BasePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasePage);
