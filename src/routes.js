import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const MassList = loadable(() => import('./components/MassList'), {
  fallback: <Loading />,
});

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/masses/year-a',
    component: () => <MassList liturgicalYear="A" />,
  },
  {
    path: '/masses/year-b',
    component: () => <MassList liturgicalYear="B" />,
  },
  {
    path: '/masses/year-c',
    component: () => <MassList liturgicalYear="C" />,
  },
  {
    path: '*',
    render: () => <ErrorPage code="404" message="NOT FOUND" />,
  },
];
