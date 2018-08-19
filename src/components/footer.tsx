import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({
  root: {
    padding: '15px 0 30px 0',
    zIndex: 2,
    fontSize: '12px',
  },
});

export interface FooterProps extends WithStyles<typeof styles> {
  notes?: string;
}

class Footer extends React.Component<FooterProps, {}> {
  render() {
    const { classes, notes } = this.props;
    return (
      <footer className={classes.root}>
        <Typography align='center'>
          &copy; {new Date().getFullYear()} iannar.com
          <br />
          {notes || ''}
        </Typography>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
