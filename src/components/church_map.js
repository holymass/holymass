import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Map, Markers} from 'react-amap';
import {fetchAllChurches} from '../actions/church';

const mapStateToProps = (state) => ({
  amapkey: state.settings.amapkey,
  mapCenter: state.settings.mapCenter,
  data: state.church.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllChurches: () => {
    dispatch(fetchAllChurches());
  },
});

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class ChurchMap extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    amapkey: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    fetchAllChurches: PropTypes.func,
    mapCenter: PropTypes.array.isRequired,
  }

  componentWillMount() {
    this.props.fetchAllChurches();
  }

  render() {
    const {classes, amapkey, data, mapCenter} = this.props;
    const center = {
      longitude: mapCenter[0],
      latitude: mapCenter[1],
    };
    const plugins = ['ToolBar'];
    const markers = data && data.length ? data.map((item) => ({
      position: {
        longitude: item.longitude,
        latitude: item.latitude,
      },
    })) : [];
    return (
      <div className={classes.root}>
        <Map amapkey={amapkey} center={center} plugins={plugins} zoom={18}>
          <Markers markers={markers}></Markers>
        </Map>
      </div>
    );
  }
}
