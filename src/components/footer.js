import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {getMetadata} from '../utils';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
    zIndex: 2,
    fontSize: '0.625rem',
  },
  icp: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
});

@withStyles(styles)
export default class Footer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  render() {
    const {classes} = this.props;
    const icp = getMetadata('footer.icp');
    return (
      <footer className={classes.root}>
        <Typography align='center'>
          &copy; {new Date().getFullYear()} {getMetadata('domain')}
          <br />
          <a
            className={classes.icp}
            href='http://www.miibeian.gov.cn/'
            target='_blank' // eslint-disable-line react/jsx-no-target-blank
          >
            {icp}
          </a>
        </Typography>
      </footer>
    );
  }
}
