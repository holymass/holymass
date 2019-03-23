import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import MassCard from './mass_card';
import {fetchMasses, fetchNextMasses} from '../actions/mass';

const mapStateToProps = (state) => ({
  data: state.mass.data,
  page: state.mass.page,
});

const mapDispatchToProps = {
  fetchMasses,
  fetchNextMasses,
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
  const {data, fetchMasses, fetchNextMasses, page, showNext} = props;
  const classes = useStyles();
  const {t} = useTranslation('mass');
  const handlePreviousPageClick = () => {
    fetchMasses(page - 1 || 1);
  };
  const handleNextPageClick = () => {
    fetchMasses(page + 1 || 1);
  };
  useEffect(() => {
    if (!data) {
      if (showNext) {
        fetchNextMasses();
      } else {
        fetchMasses(page || 1);
      }
    }
  });
  return (
    <div className={classes.root}>
      <div className={classes.massList}>
        {data && data.map((item, key) => (
          <MassCard key={key} data={item} expanded={showNext && key === 0} />
        ))}
      </div>
      <div className={classes.buttonContainer}>
        {showNext && (
          <Button
            variant='outlined'
            color='primary'
            component={Link}
            to='/masses'>
            {t('View All')}
          </Button>
        )}
        {!showNext && (
          <Button
            variant='outlined'
            color='primary'
            onClick={handlePreviousPageClick}>
            {t('Previous Page')}
          </Button>
        )}
        {!showNext && (
          <Button
            variant='outlined'
            color='primary'
            onClick={handleNextPageClick}>
            {t('Next Page')}
          </Button>
        )}
      </div>
    </div>
  );
};

MassList.propTypes = {
  data: PropTypes.array,
  fetchMasses: PropTypes.func,
  fetchNextMasses: PropTypes.func,
  page: PropTypes.number,
  showNext: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MassList);
