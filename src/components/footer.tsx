import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';

const styles = createStyles({
  footer: {
    padding: '15px 0',
    zIndex: 2,
    fontSize: '12px',
    textAlign: 'center',
  },
});

export interface FooterProps extends WithStyles<typeof styles> {
  notes?: string;
}

class Footer extends React.Component<FooterProps, {}> {
  render() {
    const { classes, notes } = this.props;
    return (
      <footer className={classes.footer}>
        <div>
          &copy; {new Date().getFullYear()} iannar.com
          <br />
          {notes || ''}
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
