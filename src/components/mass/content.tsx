import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MassCard from './card';

const styles = createStyles({
});

export interface MassContentProps extends WithStyles<typeof styles> {
  massList: any;
}

class MassContent extends React.Component<MassContentProps, {}> {
  render() {
    const { classes } = this.props;
    return (
      <List>
        {this.props.massList.map((item: any) => (
          <ListItem>
            <MassCard name={item.name} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(MassContent);
