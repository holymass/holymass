import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MassCard from './mass_card';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

class MassGrid extends React.Component {
  render() {
    const {classes, mass} = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={16}>
              {mass.map((item, key) => (
                <Grid item key={key}>
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
  mass: PropTypes.array,
};

export default withStyles(styles)(connect(mapStateToProps)(MassGrid));
