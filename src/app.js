import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {getFooterNotes} from './utils';
import withRoot from './with_root';
import Header from './components/header';
import Footer from './components/footer';
import MassPage from './pages/mass';
import AboutPage from './pages/about';

const styles = (theme) => ({
  root: {},
});

class App extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Header brand='iannar' />
        <main>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={MassPage} />
              <Route path='/about' component={AboutPage} />
            </Switch>
          </BrowserRouter>
        </main>
        <Footer notes={getFooterNotes()} />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
