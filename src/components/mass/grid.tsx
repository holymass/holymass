import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MassCard from './card';
import emitter from '../../utils/emitter';

const styles = createStyles({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

export interface MassGridProps extends WithStyles<typeof styles> {
  massList: any;
}

export interface MassGridState {
  filter: string;
}

class MassGrid extends React.Component<MassGridProps, MassGridState> {
  constructor(props: MassGridProps) {
    super(props);
    this.state = { filter: '' };
  }

  eventEmitter: any = undefined;

  componentDidMount() {
    this.eventEmitter = emitter.addListener('search', (filter) => {
      this.setState({ filter });
    });
  }

  componentWillUnmount() {
    emitter.removeListener('search', this.eventEmitter);
  }

  render() {
    const { classes, massList } = this.props;
    const { filter } = this.state;
    let mass = filter ? massList.filter((item: any) => {
      return item.name.search(filter) > -1;
    }) : massList;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={16}>
              {mass.map((item: any) => (
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

export default withStyles(styles)(MassGrid);
