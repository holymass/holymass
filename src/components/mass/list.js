import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import MassCard from './card';

const mapStateToProps = (state) => ({
  mass: state.mass.visibleList,
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
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    mass: PropTypes.array.isRequired,
  }

  render() {
    const {className, classes, mass} = this.props;
    return (
      <div className={classNames(classes.root, className)}>
        {mass.map((item, key) => (
          <MassCard key={key} name={item.name} />
        ))}
      </div>
    );
  }
}
