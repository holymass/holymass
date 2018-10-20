import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import withRoot from './with_root';
import Header from 'components/header';
import Main from 'components/main';
import routes from './routes';
import ErrorModule from './modules/error';

const Error404 = () => (<ErrorModule code='404' message='NOT FOUND' />);
const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
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
            <Route path='*' component={Error404} />
          </Switch>
        </Main>
      </div>
    );
  }
}
