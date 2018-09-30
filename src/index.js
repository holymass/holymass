import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {Provider} from 'react-redux';
import {getGA} from './utils';
import App from './app';
import store from './store';

ReactGA.initialize(getGA());
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), document.getElementById('root')
);
