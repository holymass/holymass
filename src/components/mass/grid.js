import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MassCard from './card';

const mapStateToProps = (state) => ({
  mass: state.mass.visibleList,
});

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

@connect(mapStateToProps)
@withStyles(styles)
export default class MassGrid extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    mass: PropTypes.array.isRequired,
  }

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
