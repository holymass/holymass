import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import MassCard from './MassCard';
import { fetchMasses, fetchNextMasses } from '../actions/mass';

const mapStateToProps = (state) => ({
  data: state.mass.data,
  page: state.mass.page,
});

const mapDispatchToProps = {
  onFetch: fetchMasses,
  onFetchNext: fetchNextMasses,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
}));

const MassList = (props) => {
  const { data, onFetch, onFetchNext, page, showNext } = props;
  const classes = useStyles();
  const { t } = useTranslation('mass');
  const handlePreviousPageClick = () => {
    onFetch(page - 1 || 1);
  };
  const handleNextPageClick = () => {
    onFetch(page + 1 || 1);
  };
  useEffect(() => {
    if (!data) {
      if (showNext) {
        onFetchNext();
      } else {
        onFetch(page || 1);
      }
    }
  });
  return (
    <div className={classes.root}>
      <div className={classes.massList}>
        {data &&
          data.map((item, key) => (
            <MassCard
              key={item.id}
              data={item}
              expanded={showNext && key === 0}
            />
          ))}
      </div>
      <div className={classes.buttonContainer}>
        {showNext && (
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/masses"
          >
            {t('View All')}
          </Button>
        )}
        {!showNext && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePreviousPageClick}
          >
            {t('Previous Page')}
          </Button>
        )}
        {!showNext && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleNextPageClick}
          >
            {t('Next Page')}
          </Button>
        )}
      </div>
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
  onFetch: PropTypes.func.isRequired,
  onFetchNext: PropTypes.func.isRequired,
  page: PropTypes.number,
  showNext: PropTypes.bool,
};

MassList.defaultProps = {
  page: 0,
  showNext: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MassList);
