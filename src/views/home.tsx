import * as React from 'react';
import * as _ from 'lodash';
import {
  default as withStyles,
  StyleRulesCallback,
  WithStyles,
} from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Header from '../components/header';
import Footer from '../components/footer';
import MassContent from '../components/mass/content';
import { config, mass } from '../data';
import withRoot from '../withRoot';

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
        <Header brand='iannar' />
        <MassContent massList={mass} />
        <Footer notes={_.get(config, 'footer.notes')} />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Home));
