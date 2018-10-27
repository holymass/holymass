import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {loadComponents} from 'loadable-components';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {getMetadata} from './utils';
import App from './app';
import createStore from './store';
import './i18n';
import './app.css';

ReactGA.initialize(getMetadata('google.ga'));
ReactGA.pageview(window.location.pathname + window.location.search);

loadComponents().then(() => {
  ReactDOM.hydrate((
    <Provider store={createStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
});
