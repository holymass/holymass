import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {},
});

@withStyles(styles)
export default class FeedbackModule extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={this.props.classes.root}>
          feedback
      </div>
    );
  }
}
