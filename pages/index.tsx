import * as React from 'react';
import type { NextPage, NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Main from '../src/components/Main';
import MassGrid from '../src/features/mass/MassGrid';
import UpcomingMassGrid from '../src/features/mass/UpcomingMassGrid';
import ListMassesUseCase from '../src/features/mass/usecases/ListMassesUseCase';
import MassRepository from '../src/features/mass/domain/MassRepository';

const Home: NextPage = () => {
  const { t } = useTranslation('mass');
  const repo = new MassRepository();
  const data = new ListMassesUseCase(repo).execute({ filter: '' });
  return (
    <Main>
      <Typography variant="h5" mt={3}>
        {t('Upcoming Masses')}
      </Typography>
      <UpcomingMassGrid />
      <Divider />
      <Typography variant="h5" mt={3}>
        {t('All Masses')}
      </Typography>
      <MassGrid data={data} />
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
