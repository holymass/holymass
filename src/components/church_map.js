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
    width: 375,
    height: 600,
  },
});

@connect(mapStateToProps)
@withStyles(styles)
export default class ChurchList extends React.Component {
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
