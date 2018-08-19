import * as React from 'react';
import {
  default as withStyles,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';

const styles: StyleRulesCallback<'root'> = (theme: any) => ({
  root: {
  }
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
