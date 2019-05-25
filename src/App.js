import React from 'react';
import { Route, Switch } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';
import Hidden from '@material-ui/core/Hidden';
import Header from 'components/Header';
import Main from 'components/Main';
import BottomNav from 'components/BottomNav';
import getMetadata from './getMetadata';
import routes from './routes';
import ErrorModule from './modules/ErrorModule';

const Error404 = () => <ErrorModule code="404" message="NOT FOUND" />;
const drawerWidth = getMetadata('drawer.width');

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  bottomNav: {
    height: 56,
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Main>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
          <Route path="*" component={Error404} />
        </Switch>
      </Main>
      <Hidden mdUp>
        <div className={classes.bottomNav} />
        <BottomNav />
      </Hidden>
    </div>
  );
}
