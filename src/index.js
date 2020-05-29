import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { useSSR } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ThemeProvider } from '@material-ui/styles';
import Loading from 'components/Loading';
import getMetadata from './getMetadata';
import theme from './theme';
import createStore from './createStore';
import App from './App';
import './i18n';

ReactGA.initialize(getMetadata('google.ga'));
ReactGA.pageview(window.location.pathname + window.location.search);

const preloadedState = window.PRELOADED_STATE;
const initialI18nStore = window.INITIAL_I18N_STORE;
const store = createStore(preloadedState);
const ReactApp = () => {
  useSSR(initialI18nStore);
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

delete window.PRELOADED_STATE;
delete window.INITIAL_I18N_STORE;

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ReactApp />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
});
