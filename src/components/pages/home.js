import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MassGrid from '../mass/grid';
import {mass} from '../../data';

const styles = (theme) => ({
  root: {},
});

class Home extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <MassGrid massList={mass} />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
