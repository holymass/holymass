import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import _ from 'lodash';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router';
import {config} from './data';
import App from './components/app';

ReactGA.initialize(_.get(config, 'google.ga'));
ReactGA.pageview(window.location.pathname + window.location.search);

const hist = createBrowserHistory();

ReactDOM.render((
  <Router history={hist}>
    <App />
  </Router>), document.getElementById('root')
);
