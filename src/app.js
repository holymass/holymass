import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import withRoot from './with_root';
import Header from 'components/header';
import Main from 'components/main';
import Footer from 'components/footer';
import routes from './routes';

const styles = (theme) => ({
  root: {
    height: '100%',
  },
});

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
              {routes.map((route, key) => (
                <Route
                  key={key}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Switch>
          </Main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
