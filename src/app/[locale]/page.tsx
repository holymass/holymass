import * as React from 'react';

import Main from '@/components/Main';
import MassTabs from '@/features/mass/MassTabs';
import UpcomingMassGrid from '@/features/mass/UpcomingMassGrid';

export default function Home() {
  return (
    <Main>
      <UpcomingMassGrid />
      <MassTabs />
    </Main>
  );
}
