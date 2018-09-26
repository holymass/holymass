import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MassCard from './card';
import emitter from '../../utils/emitter';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

class MassGrid extends React.Component {
  state = {
    filter: '',
  };

  eventEmitter = undefined;

  componentDidMount() {
    this.eventEmitter = emitter.addListener('search', (filter) => {
      this.setState({
        filter,
      });
    });
  }

  componentWillUnmount() {
    if (this.eventEmitter) {
      emitter.removeListener('search', this.eventEmitter._events['search']);
    }
  }

  render() {
    const {classes, massList} = this.props;
    const {filter} = this.state;
    let mass = filter ? massList.filter((item) => {
      return item.value.search(filter) > -1 ||
        item.value.replace(/\s/g, '').search(filter) > -1;
    }) : massList;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={16}>
              {mass.map((item) => (
                <Grid item>
                  <MassCard name={item.name} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MassGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  massList: PropTypes.array,
};

export default withStyles(styles)(MassGrid);
