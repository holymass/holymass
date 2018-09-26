import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {withStyles} from '@material-ui/core/styles';
import {Route, Switch} from 'react-router';
import {config} from '../data';
import withRoot from '../with_root';
import Header from './header';
import Footer from './footer';
import Home from './pages/home';
import About from './pages/about';

const styles = (theme) => ({
  root: {},
});

class App extends React.Component {
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

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
