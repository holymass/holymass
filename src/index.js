import React, {Suspense, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {Provider} from 'react-redux';
import {useSSR} from 'react-i18next';
import {BrowserRouter} from 'react-router-dom';
import {loadableReady} from '@loadable/component';
import {ThemeProvider} from '@material-ui/styles';
import Loading from 'components/loading';
import {getMetadata} from './utils';
import theme from '../src/theme';
import createStore from './store';
import App from './app';
import './i18n';
import './app.css';

ReactGA.initialize(getMetadata('google.ga'));
ReactGA.pageview(window.location.pathname + window.location.search);

const preloadedState = window.__PRELOADED_STATE__;
const initialI18nStore = window.__INITIAL_I18N_STORE__;
const store = createStore(preloadedState);
const ReactApp = () => {
  useSSR(initialI18nStore, preloadedState.settings.language);
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });
  return (
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
};

delete window.__PRELOADED_STATE__;
delete window.__INITIAL_I18N_STORE__;

loadableReady(() => {
  ReactDOM.hydrate((
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ReactApp />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
});
