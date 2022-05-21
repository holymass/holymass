import * as React from 'react';
import type { NextPage, NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Main from '../src/components/Main';
import MassGrid from '../src/features/mass/MassGrid';
import ListMassesUseCase from '../src/features/mass/usecases/ListMassesUseCase';
import MassRepository from '../src/features/mass/domain/MassRepository';
import ListFeaturedMassesUseCase from '../src/features/mass/usecases/ListFeaturedMassesUseCase';

const Home: NextPage = () => {
  const { t } = useTranslation('mass');
  const repo = new MassRepository();
  const featuredMasses = new ListFeaturedMassesUseCase(repo).execute();
  const allMasses = new ListMassesUseCase(repo).execute();
  return (
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
