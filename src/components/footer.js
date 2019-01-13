import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {getMetadata} from '../utils';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  root: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit,
    zIndex: 2,
  },
  icp: {
    color: theme.palette.text.secondary,
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
          <Link
            href='http://www.miibeian.gov.cn/'
            target='_blank'
          >
            {icp}
          </Link>
        </Typography>
      </footer>
    );
  }
}
