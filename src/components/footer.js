import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {getMetadata} from '../utils';

const styles = (theme) => ({
  root: {
    padding: '15px 0 30px 0',
    zIndex: 2,
    fontSize: '12px',
  },
});

class Footer extends React.Component {
  render() {
    const {classes, notes} = this.props;
    return (
      <footer className={classes.root}>
        <Typography align='center'>
          &copy; {new Date().getFullYear()} {getMetadata('domain')}
          <br />
          {notes || ''}
        </Typography>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  notes: PropTypes.string,
};

export default withStyles(styles)(Footer);
