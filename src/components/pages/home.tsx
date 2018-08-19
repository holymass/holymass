import * as React from 'react';
import {
  default as withStyles,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import MassGrid from '../mass/grid';
import { mass } from '../../data';

const styles: StyleRulesCallback<'root'> = (theme: any) => ({
  root: {
  }
});

export interface HomeProps extends WithStyles<typeof styles> {
}

class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <MassGrid massList={mass} />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
