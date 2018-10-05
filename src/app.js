import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import withRoot from './with_root';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import MassModule from './modules/mass';
import ChurchesModule from './modules/churches';
import SettingsModule from './modules/settings';
import FeedbackModule from './modules/feedback';
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
              <Route path='/churches' component={ChurchesModule} />
              <Route path='/settings' component={SettingsModule} />
              <Route path='/feedback' component={FeedbackModule} />
              <Route component={Error404} />
            </Switch>
          </Main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
