import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading';

const ChurchMap = loadable(() => import('components/ChurchMap'), {
  fallback: <Loading />,
});

export default function ChurchModule() {
  return <ChurchMap />;
}
