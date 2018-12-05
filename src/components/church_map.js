import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Map} from 'react-amap';

const mapStateToProps = (state) => ({
  amapkey: state.settings.amapkey,
});

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
    width: '100%',
    height: 'calc(100vh - 80px)',
  },
});

@connect(mapStateToProps)
@withStyles(styles)
export default class ChurchMap extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    amapkey: PropTypes.string.isRequired,
  }

  render() {
    const {classes, amapkey} = this.props;
    return (
      <div className={classes.root}>
        <Map amapkey={amapkey} />
      </div>
    );
  }
}
