import * as React from 'react';
import type { NextPage, NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Main from '../src/components/Main';
import MassTabs from '../src/features/mass/MassTabs';
import UpcomingMassGrid from '../src/features/mass/UpcomingMassGrid';

const Home: NextPage = () => {
  const { t } = useTranslation('mass');
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
