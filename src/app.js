import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import withRoot from './with_root';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import MassModule from './modules/mass';
import ChurchModule from './modules/church';
import SettingsModule from './modules/settings';
import ErrorModule from './modules/error';

const styles = (theme) => ({
  root: {
    height: '100%',
  },
});

const Error404 = () => <ErrorModule code='404' message='NOT FOUND' />;

@withRoot
@withStyles(styles)
export default class App extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {classes} = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Header />
          <Main>
            <Switch>
              <Route exact path='/' component={MassModule} />
              <Route path='/churches' component={ChurchModule} />
              <Route path='/masses' component={MassModule} />
              <Route path='/settings' component={SettingsModule} />
              <Route component={Error404} />
            </Switch>
          </Main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
