import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import window from 'global';
import makeStyles from '@material-ui/styles/makeStyles';
import Divider from '@material-ui/core/Divider';
import VirtualizedList from './VirtualizedList';
import MassCard from './MassCard';
import { fetchMasses } from '../actions/mass';
import { dataSelector } from '../selectors/mass';

const mapStateToProps = (state) => ({
  data: dataSelector(state),
  next: state.mass.next,
  total: state.mass.total,
});

const mapDispatchToProps = {
  onFetch: fetchMasses,
};

const useStyles = makeStyles((theme) => {
  const innerHeight = window.innerHeight;
  return {
    root: {
      height: `calc(${innerHeight}px - 56px)`,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        height: `calc(${innerHeight}px - 48px)`,
      },
      [theme.breakpoints.up('sm')]: {
        height: `calc(${innerHeight}px - 64px)`,
      },
    },
  };
});

const MassList = (props) => {
  const { data, next, onFetch } = props;
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const renderer = (item) => (
    <React.Fragment>
      <MassCard key={item.id} data={item} />
      <Divider />
    </React.Fragment>
  );
  const loadNextPage = () => {
    if (next) {
      onFetch(page);
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (!data) {
      loadNextPage();
    }
  });
  return (
    <div className={classes.root}>
      <VirtualizedList
        renderer={renderer}
        data={data}
        hasNext={next}
        loadMoreRows={loadNextPage}
      />
    </div>
  );
};

MassList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      solemnity: PropTypes.shape({
        name: PropTypes.string.isRequired,
        liturgicalYear: PropTypes.string.isRequired,
        firstReading: PropTypes.string.isRequired,
        responsorialPsalm: PropTypes.string.isRequired,
        secondReading: PropTypes.string.isRequired,
        gospel: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  next: PropTypes.bool.isRequired,
  onFetch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MassList);
