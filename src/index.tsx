import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactGA from 'react-ga';
import * as _ from 'lodash';
import { createHashHistory } from 'history';
import { Router } from 'react-router';
import { config } from './data';
import App from './components/app';

ReactGA.initialize(_.get(config, 'google.ga'));
ReactGA.pageview(window.location.pathname + window.location.search);

const hist = createHashHistory();

ReactDOM.render((
  <Router history={hist}>
    <App />
  </Router>), document.getElementById('root')
);
