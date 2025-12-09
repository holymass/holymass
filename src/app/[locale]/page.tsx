import * as React from 'react';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import getIntl from '@/intl';
import theme from '@/theme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServerIntlProvider from '@/components/ServerIntlProvider';
import Main from '@/components/Main';
import MassTabs from '@/features/mass/MassTabs';
import UpcomingMassGrid from '@/features/mass/UpcomingMassGrid';

export const metadata: Metadata = {
  title: 'HolyMass',
  description: 'HolyMass',
};

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        backgroundColor: '#f5f5f5',
      },
    }}
  />
);

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const intl = await getIntl(locale);
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        <ServerIntlProvider locale={locale} messages={intl.messages}>
          <Header />
          <Main>
            <UpcomingMassGrid />
            <MassTabs />
          </Main>
          <Footer />
        </ServerIntlProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
