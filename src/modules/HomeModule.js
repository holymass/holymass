import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading';

const MassList = loadable(() => import('components/MassList'), {
  fallback: <Loading />,
});

export default function HomeModule() {
  return <MassList showNext />;
}
