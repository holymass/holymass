import HomeModule from './modules/home';
import MassModule from './modules/mass';
import ChurchModule from './modules/church';
import SettingsModule from './modules/settings';

export default [{
  exact: true,
  path: '/',
  component: HomeModule,
}, {
  exact: false,
  path: '/masses',
  component: MassModule,
}, {
  exact: false,
  path: '/churches',
  component: ChurchModule,
}, {
  exact: false,
  path: '/settings',
  component: SettingsModule,
}];
