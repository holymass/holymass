import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  StyleRulesCallback,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MassCard from './card';

const styles: StyleRulesCallback<'root'> = (theme: any) => ({
  root: {
    flexGrow: 1,
    padding: 16,
  }
});

export interface MassContentProps extends WithStyles<typeof styles> {
  massList: any;
}

class MassContent extends React.Component<MassContentProps, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={16}>
              {this.props.massList.map((item: any) => (
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

export default withStyles(styles)(MassContent);
