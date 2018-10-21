import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {getLoadableState} from 'loadable-components/server';
import createStore from '../src/store';
import App from '../src/app';

const indexHtmlPath = path.join(__dirname, '../assets/index.html');
const html = fs.readFileSync(indexHtmlPath, 'utf8');

export default async (ctx, next) => {
  const context = {};
  const reactApp = (
    <Provider store={createStore()}>
      <I18nextProvider i18n={ctx.i18next}>
        <StaticRouter context={context} location={ctx.req.url}>
          <App/>
        </StaticRouter>
      </I18nextProvider>
    </Provider>
  );
  const body = ReactDOMServer.renderToString(reactApp);
  const loadableState = await getLoadableState(reactApp);
  ctx.body = html
      .replace('<div id=root></div>', `<div id=root>${body}</div>`)
      .replace('<script id=loadable></script>',
          `${loadableState.getScriptTag()}`);
};
