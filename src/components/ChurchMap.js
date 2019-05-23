import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, Markers } from 'react-amap';
import makeStyles from '@material-ui/styles/makeStyles';
import { fetchAllChurches } from '../actions/church';

const mapStateToProps = (state) => ({
  amapkey: state.settings.amapkey,
  mapCenter: state.settings.mapCenter,
  data: state.church.data,
});

const mapDispatchToProps = (dispatch) => ({
  onFetch: () => {
    dispatch(fetchAllChurches());
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: `calc(${window.innerHeight}px - 56px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(${window.innerHeight}px - 48px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(${window.innerHeight}px - 64px)`,
    },
  },
}));

const ChurchMap = (props) => {
  const { amapkey, data, mapCenter, onFetch } = props;
  const classes = useStyles();
  const center = {
    longitude: mapCenter[0],
    latitude: mapCenter[1],
  };
  const plugins = ['ToolBar'];
  const markers =
    data && data.length
      ? data.map((item) => ({
          position: {
            longitude: item.longitude,
            latitude: item.latitude,
          },
        }))
      : [];
  useEffect(() => {
    if (!data) {
      onFetch();
    }
  });
  return (
    <div className={classes.root}>
      <Map amapkey={amapkey} center={center} plugins={plugins} zoom={18}>
        <Markers markers={markers} />
      </Map>
    </div>
  );
};

const marker = PropTypes.shape({
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
});

ChurchMap.propTypes = {
  amapkey: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(marker).isRequired,
  mapCenter: PropTypes.arrayOf(marker).isRequired,
  onFetch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChurchMap);
