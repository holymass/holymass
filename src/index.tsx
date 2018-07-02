import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactGA from 'react-ga';
import * as _ from 'lodash';
import { createHashHistory } from 'history';
import { Router, Route, Switch } from 'react-router';
import { config } from './data';
import routes from './routes';

ReactGA.initialize(_.get(config, 'google.ga'));
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
  document.getElementById('root')
);
