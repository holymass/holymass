import * as React from 'react';
import type { NextPage, NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Header from '../src/components/Header';
import Main from '../src/components/Main';
import MassGrid from '../src/components/MassGrid';
import ListMassesUseCase from '../src/usecases/ListMassesUseCase';
import MassRepository from '../src/domain/mass/MassRepository';
import ListFeaturedMassesUseCase from '../src/usecases/ListFeaturedMassesUseCase';

const Home: NextPage = () => {
  const { t } = useTranslation('mass');
  const repo = new MassRepository();
  const featuredMasses = new ListFeaturedMassesUseCase(repo).execute();
  const allMasses = new ListMassesUseCase(repo).execute();
  return (
    <React.Fragment>
      <Header />
      <Main>
        <Typography variant="h5" mt={3}>
          {t('Featured Masses')}
        </Typography>
        <MassGrid data={featuredMasses} />
        <Divider />
        <Typography variant="h5" mt={3}>
          {t('All Masses')}
        </Typography>
        <MassGrid data={allMasses} />
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
