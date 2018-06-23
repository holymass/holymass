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
    position: 'relative',
    fontSize: '12px',
  },
  left: {
    float: 'left',
    display: 'block',
  },
  right: {
    float: 'right',
    padding: '15px 0',
    margin: '0',
  },
});

export interface FooterProps extends WithStyles<typeof styles> {
}

class Footer extends React.Component<FooterProps, {}> {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <div>
          <div className={classes.left}>
            <div>&copy; {new Date().getFullYear()} iannar.com</div>
            <div>苏ICP备14030758号</div>
          </div>
          <div className={classes.right}>
            <a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
              <img alt='Creative Commons License' src='/assets/images/cc-by-nc-sa-4.0-88x31.png' />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
