import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Map, Markers} from 'react-amap';
import makeStyles from '@material-ui/styles/makeStyles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

const ChurchMap = (props) => {
  const {amapkey, data, mapCenter, fetchAllChurches} = props;
  const classes = useStyles();
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
  fetchAllChurches && fetchAllChurches();
  return (
    <div className={classes.root}>
      <Map amapkey={amapkey} center={center} plugins={plugins} zoom={18}>
        <Markers markers={markers}></Markers>
      </Map>
    </div>
  );
};

ChurchMap.propTypes = {
  amapkey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  mapCenter: PropTypes.array.isRequired,
  fetchAllChurches: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChurchMap);
