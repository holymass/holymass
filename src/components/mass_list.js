import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import MassCard from './mass_card';

const mapStateToProps = (state) => ({
  massList: state.mass.visibleList,
  liturgicalYear: state.settings.liturgicalYear,
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

@connect(mapStateToProps)
@withStyles(styles)
export default class MassList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    massList: PropTypes.array.isRequired,
    liturgicalYear: PropTypes.string.isRequired,
  }

  render() {
    const {classes, massList, liturgicalYear} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.massList}>
          {massList.map((mass, key) => (
            <MassCard key={key} mass={mass} liturgicalYear={liturgicalYear} />
          ))}
        </div>
      </div>
    );
  }
}
