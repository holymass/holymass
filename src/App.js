import React from 'react';
import { renderRoutes } from 'react-router-config';
import makeStyles from '@material-ui/styles/makeStyles';
import Hidden from '@material-ui/core/Hidden';
import Header from 'components/Header';
import Main from 'components/Main';
import BottomNav from 'components/BottomNav';
import getMetadata from './getMetadata';
import routes from './routes';

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
      <Main>{renderRoutes(routes)}</Main>
      <Hidden mdUp>
        <div className={classes.bottomNav} />
        <BottomNav />
      </Hidden>
    </div>
  );
}
