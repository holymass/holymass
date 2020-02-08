import React from 'react';
import ChurchPage from './pages/ChurchPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import MassPage from './pages/MassPage';
import SettingsPage from './pages/SettingsPage';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/masses',
    component: MassPage,
  },
  {
    path: '/churches',
    component: ChurchPage,
  },
  {
    path: '/settings',
    component: SettingsPage,
  },
  {
    path: '*',
    render: () => <ErrorPage code="404" message="NOT FOUND" />,
  },
];
