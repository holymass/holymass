import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import createStyles from '@material-ui/core/styles/createStyles';
import {
  default as withStyles,
  WithStyles
} from '@material-ui/core/styles/withStyles';
import { Route, Switch } from 'react-router';
import { config } from '../data';
import withRoot from '../with_root';
import Header from './header';
import Footer from './footer';
import Home from './pages/home';
import About from './pages/about';

const styles = createStyles({
  root: {
  },
});

export interface AppProps extends WithStyles<typeof styles> {
}

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Header brand='iannar' />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
          </Switch>
        </main>
        <Footer notes={_.get(config, 'footer.notes')} />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
