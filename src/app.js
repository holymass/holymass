import React from 'react';
import {Route, Switch} from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';
import Header from 'components/header';
import Main from 'components/main';
import {getMetadata} from './utils';
import routes from './routes';
import ErrorModule from './modules/error';

const Error404 = () => (<ErrorModule code='404' message='NOT FOUND' />);
const drawerWidth = getMetadata('drawer.width');

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
}));

export default function App() {
  const classes = useStyles();
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
