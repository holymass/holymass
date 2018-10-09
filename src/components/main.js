import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    height: 'calc(100vh - 56px)',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: 'calc(100vh - 48px)',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
    },
    overflowY: 'auto',
  },
});

@withStyles(styles)
export default class Main extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {children, classes} = this.props;
    return (
      <main className={classes.root}>
        {children}
      </main>
    );
  }
}
