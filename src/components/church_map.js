import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Map, Markers} from 'react-amap';

const mapStateToProps = (state) => ({
  amapkey: state.settings.amapkey,
});

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
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
    const center = {
      longitude: 121.561065,
      latitude: 31.227598,
    };
    const plugins = ['ToolBar'];
    const markers = [
      {
        position: {
          longitude: 121.436098,
          latitude: 31.191145,
        },
      },
      {
        position: {
          longitude: 121.561065,
          latitude: 31.227598,
        },
      },
    ];
    return (
      <div className={classes.root}>
        <Map amapkey={amapkey} center={center} plugins={plugins} zoom={18}>
          <Markers markers={markers}></Markers>
        </Map>
      </div>
    );
  }
}
