import * as React from 'react';
import * as _ from 'lodash';
import {
  default as withStyles,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import withRoot from '../with_root';
import Header from '../components/header';
import Footer from '../components/footer';
import { config, mass } from '../data';

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
        <Header brand='iannar' />
          iannar.com
        <Footer notes={_.get(config, 'footer.notes')} />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(About));
