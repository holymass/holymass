import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
    fetchNextMasses: PropTypes.func,
    page: PropTypes.number,
    t: PropTypes.object.isRequired,
    showNext: PropTypes.bool,
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
    const {fetchMasses, fetchNextMasses, page, showNext} = this.props;
    if (showNext) {
      fetchNextMasses();
    } else {
      fetchMasses(page || 1);
    }
  }

  render() {
    const {classes, data, t, showNext} = this.props;
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
              onClick={this.handlePreviousPageClick}>
              {t('Previous Page')}
            </Button>
          )}
          {!showNext && (
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
