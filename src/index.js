import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {Provider} from 'react-redux';
import _ from 'lodash';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router';
import {config} from './data';
import App from './components/app';
import store from './store';

ReactGA.initialize(_.get(config, 'google.ga'));
ReactGA.pageview(window.location.pathname + window.location.search);

const hist = createBrowserHistory();

ReactDOM.render((
  <Provider store={store}>
    <Router history={hist}>
      <App />
    </Router>
  </Provider>), document.getElementById('root')
);
