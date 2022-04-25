import * as React from 'react';
import type { NextPage, NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '../src/components/Header';
import Main from '../src/components/Main';
import MassGrid from '../src/components/MassGrid';

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Main>
        <MassGrid />
      </Main>
    </React.Fragment>
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
