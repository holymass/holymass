import * as React from 'react';
import type { NextPage, NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Main from '../src/components/Main';
import MassTabs from '../src/features/mass/MassTabs';
import UpcomingMassGrid from '../src/features/mass/UpcomingMassGrid';

const Home: NextPage = () => {
  return (
    <Main>
      <UpcomingMassGrid />
      <MassTabs />
    </Main>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { locale = 'zh' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'mass'])),
    },
  };
}

export default Home;
