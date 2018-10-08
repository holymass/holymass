import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    minHeight: '100%',
  },
  toolbar: theme.mixins.toolbar,
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
        <div className={classes.toolbar} />
        {children}
      </main>
    );
  }
}
