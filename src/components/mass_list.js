import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import MassCard from './mass_card';
import {fetchRecentMasses} from '../actions/mass';

const DEFAULT_SIZE = 20;

const mapStateToProps = (state) => ({
  data: state.mass.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecentMasses: () => {
    dispatch(fetchRecentMasses(DEFAULT_SIZE));
  },
});

const styles = (theme) => ({
  root: {
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
});

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class MassList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array,
    fetchRecentMasses: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchRecentMasses();
  }

  render() {
    const {classes, data} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.massList}>
          {data && data.map((item, key) => (
            <MassCard key={key} data={item} />
          ))}
        </div>
      </div>
    );
  }
}
