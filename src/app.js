import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {getMetadata} from './utils';
import withRoot from './with_root';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import MassPage from './pages/mass';
import AboutPage from './pages/about';
import ErrorPage from './pages/error';

const styles = (theme) => ({
  root: {},
});

const Error404 = () => <ErrorPage code='404' message='NOT FOUND'/>;

class App extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Header brand={getMetadata('brand')} />
          <Main>
            <Switch>
              <Route exact path='/' component={MassPage} />
              <Route path='/about' component={AboutPage} />
              <Route component={Error404} />
            </Switch>
          </Main>
          <Footer notes={getMetadata('footer.notes')} />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
