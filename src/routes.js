import HomeModule from './modules/HomeModule';
import MassModule from './modules/MassModule';
import ChurchModule from './modules/ChurchModule';
import SettingsModule from './modules/SettingsModule';

export default [
  {
    exact: true,
    path: '/',
    component: HomeModule,
  },
  {
    exact: false,
    path: '/masses',
    component: MassModule,
  },
  {
    exact: false,
    path: '/churches',
    component: ChurchModule,
  },
  {
    exact: false,
    path: '/settings',
    component: SettingsModule,
  },
];
