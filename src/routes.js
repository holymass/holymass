import loadable from 'loadable-components';
import Loading from 'components/loading';

const HomeModule = loadable(() => import(
    /* webpackChunkName: "./modules/home" */ './modules/home'), {
  LoadingComponent: Loading,
});
const MassModule = loadable(() => import(
    /* webpackChunkName: "./modules/mass" */ './modules/mass'), {
  LoadingComponent: Loading,
});
const ChurchModule = loadable(() => import(
    /* webpackChunkName: "./modules/church" */ './modules/church'), {
  LoadingComponent: Loading,
});
const SettingsModule = loadable(() => import(
    /* webpackChunkName: "./modules/settings" */ './modules/settings'), {
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
