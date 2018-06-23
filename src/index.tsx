import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactGA from 'react-ga';
import { createHashHistory } from 'history';
import { Router, Route, Switch } from 'react-router';
import routes from './routes';

ReactGA.initialize('UA-120959122-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const hist = createHashHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {routes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>,
  document.getElementById('app')
);
