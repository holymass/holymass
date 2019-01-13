import loadable from '@loadable/component';
import Loading from 'components/loading';

const HomeModule = loadable(() => import('./modules/home'), {
  LoadingComponent: Loading,
});
const MassModule = loadable(() => import('./modules/mass'), {
  LoadingComponent: Loading,
});
const ChurchModule = loadable(() => import('./modules/church'), {
  LoadingComponent: Loading,
});
const SettingsModule = loadable(() => import('./modules/settings'), {
  LoadingComponent: Loading,
});

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
