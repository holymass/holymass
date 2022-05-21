import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';

import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const clientSideEmotionCache = createEmotionCache();

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        backgroundColor: '#f5f5f5',
      },
    }}
  />
);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
