import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, Markers } from 'react-amap';
import makeStyles from '@material-ui/styles/makeStyles';
import { fetchChurches } from '../actions/church';

const mapStateToProps = (state) => ({
  amapkey: state.settings.map.amapkey,
  center: state.settings.map.center,
  data: state.church.data,
});

const mapDispatchToProps = (dispatch) => ({
  onFetch: () => {
    dispatch(fetchChurches());
  },
});

const useStyles = makeStyles(() => {
  return {
    root: {
      width: '100%',
      height: `calc(100vh - 48px)`,
    },
  };
});

const ChurchMap = (props) => {
  const { amapkey, data, center, onFetch } = props;
  const classes = useStyles();
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
    if (!data || data.length === 0) {
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
  data: PropTypes.arrayOf(marker),
  center: marker.isRequired,
  onFetch: PropTypes.func.isRequired,
};

ChurchMap.defaultProps = {
  data: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ChurchMap);
