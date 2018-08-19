import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';

const styles = createStyles({
  root: {
  },
});

export interface AboutProps extends WithStyles<typeof styles> {
}

class About extends React.Component<AboutProps, {}> {
  render() {
    return (
      <div className={this.props.classes.root}>
          iannar.com
      </div>
    );
  }
}

export default withStyles(styles)(About);
