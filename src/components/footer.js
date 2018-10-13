import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {getMetadata} from '../utils';
import Action from 'components/action';

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
        <Typography align='center' variant='caption'>
          &copy; {new Date().getFullYear()} {getMetadata('domain')}
          <br />
          <Action
            className={classes.icp}
            href='http://www.miibeian.gov.cn/'
            target='_blank'
          >
            {icp}
          </Action>
        </Typography>
      </footer>
    );
  }
}
