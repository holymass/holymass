import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Loading extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    timedOut: PropTypes.bool,
    pastDelay: PropTypes.bool,
    retry: PropTypes.func,
  };

  render() {
    const {error, timedOut, pastDelay, retry} = this.props;
    if (error) {
      return (<div>Error</div>);
    }
    if (timedOut) {
      return (
        <div>
          Taking a long time...
          <Button onClick={retry}>
            Retry
          </Button>
        </div>
      );
    }
    if (pastDelay) {
      return (<CircularProgress />);
    }
    return null;
  }
}
