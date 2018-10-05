import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {Provider} from 'react-redux';
import {getMetadata} from './utils';
import App from './app';
import store from './store';
import i18n from './i18n'; // eslint-disable-line no-unused-vars

ReactGA.initialize(getMetadata('google.ga'));
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), document.getElementById('root')
);
