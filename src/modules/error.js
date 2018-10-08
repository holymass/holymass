import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default class ErrorModule extends React.Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  };

  render() {
    const {code, message} = this.props;
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
