import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MassCard from './mass_card';
import {fetchMasses, fetchRecentMasses} from '../actions/mass';

const mapStateToProps = (state) => ({
  data: state.mass.data,
  page: state.mass.page,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMasses: (page) => {
    dispatch(fetchMasses(page));
  },
  fetchRecentMasses: () => {
    dispatch(fetchRecentMasses());
  },
});

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [`${theme.breakpoints.up('md')}`]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 'auto',
    },
  },
  massList: {
    minWidth: theme.spacing.unit * 36,
    [`${theme.breakpoints.up('md')}`]: {
      maxWidth: `calc(40vw + ${theme.spacing.unit * 2}px)`,
      width: 'calc(100vw - 255px)',
    },
    [`${theme.breakpoints.up('lg')}`]: {
      maxWidth: `calc(50vw + ${theme.spacing.unit * 10}px)`,
      width: 'calc(100vw - 255px)',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@withNamespaces('mass')
@withStyles(styles)
export default class MassList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    fetchMasses: PropTypes.func,
    fetchRecentMasses: PropTypes.func,
    page: PropTypes.number,
    t: PropTypes.object.isRequired,
    showRecent: PropTypes.bool,
  }

  handlePreviousPageClick = () => {
    const {fetchMasses, page} = this.props;
    fetchMasses(page - 1 || 1);
  };

  handleNextPageClick = () => {
    const {fetchMasses, page} = this.props;
    fetchMasses(page + 1 || 1);
  };

  componentWillMount() {
    const {fetchMasses, fetchRecentMasses, page, showRecent} = this.props;
    if (showRecent) {
      fetchRecentMasses();
    } else {
      fetchMasses(page || 1);
    }
  }

  render() {
    const {classes, data, t, showRecent} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.massList}>
          {data && data.map((item, key) => (
            <MassCard key={key} data={item} />
          ))}
        </div>
        <div className={classes.buttonContainer}>
          {showRecent && (
            <Button
              variant='outlined'
              color='primary'
              component={Link}
              to='/masses'>
              {t('View All')}
            </Button>
          )}
          {!showRecent && (
            <Button
              variant='outlined'
              color='primary'
              onClick={this.handlePreviousPageClick}>
              {t('Previous Page')}
            </Button>
          )}
          {!showRecent && (
            <Button
              variant='outlined'
              color='primary'
              onClick={this.handleNextPageClick}>
              {t('Next Page')}
            </Button>
          )}
        </div>
      </div>
    );
  }
}
