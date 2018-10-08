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
    padding: theme.spacing.unit,
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
        {massList.map((mass, key) => (
          <MassCard key={key} mass={mass} liturgicalYear={liturgicalYear} />
        ))}
      </div>
    );
  }
}
