import React from 'react';
import { renderRoutes } from 'react-router-config';
import makeStyles from '@material-ui/styles/makeStyles';
import Hidden from '@material-ui/core/Hidden';
import Header from 'components/Header';
import Main from 'components/Main';
import BottomNav from 'components/BottomNav';
import routes from './routes';

const useStyles = makeStyles(() => ({
  root: {},
  bottomNav: {
    height: 56,
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Main>{renderRoutes(routes)}</Main>
      <Hidden mdUp>
        <div className={classes.bottomNav} />
        <BottomNav />
      </Hidden>
    </div>
  );
}
