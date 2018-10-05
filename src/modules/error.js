import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
  },
});

@withStyles(styles)
export default class ErrorModule extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    code: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  };

  render() {
    const {classes, code, message} = this.props;
    return (
      <div className={classes.root}>
        <Typography variant='display4' gutterBottom align='center'>
          {code}
        </Typography>
        <Typography variant='display2' gutterBottom align='center'>
          {message}
        </Typography>
      </div>
    );
  }
}
