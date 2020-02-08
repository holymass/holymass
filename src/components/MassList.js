import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import window from 'global';
import makeStyles from '@material-ui/styles/makeStyles';
import Divider from '@material-ui/core/Divider';
import VirtualizedList from './VirtualizedList';
import MassCard from './MassCard';
import { fetchMasses } from '../actions/mass';
import { selectByLiturgicalYear } from '../selectors/mass';
import getMetadata from '../getMetadata';

const mapStateToProps = (state) => ({
  data: state.mass,
});

const mapDispatchToProps = {
  onFetch: fetchMasses,
};

const useStyles = makeStyles((theme) => {
  const innerHeight = window.innerHeight;
  return {
    root: {
      height: `calc(${innerHeight}px - 56px - 56px)`,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        height: `calc(${innerHeight}px - 48px - 48px)`,
      },
      [theme.breakpoints.up('sm')]: {
        height: `calc(${innerHeight}px - 64px - 64px)`,
      },
    },
  };
});

const MassList = (props) => {
  const { data, liturgicalYear, onFetch } = props;
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const renderer = (item) => (
    <>
      <MassCard key={item.id} data={item} />
      <Divider />
    </>
  );
  const loadNextPage = () => {
    if (data[liturgicalYear].next) {
      onFetch(liturgicalYear, page);
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (!data[liturgicalYear].data) {
      loadNextPage();
    }
  });
  return (
    <div className={classes.root}>
      <VirtualizedList
        renderer={renderer}
        data={selectByLiturgicalYear(data, liturgicalYear)}
        hasNext={data[liturgicalYear].next}
        loadMoreRows={loadNextPage}
      />
    </div>
  );
};

MassList.propTypes = {
  data: PropTypes.object.isRequired,
  onFetch: PropTypes.func.isRequired,
  liturgicalYear: PropTypes.string,
};

MassList.defaultProps = {
  liturgicalYear: getMetadata('liturgicalYear'),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MassList);
