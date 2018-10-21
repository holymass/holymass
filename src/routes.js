import loadable from 'loadable-components';
import Loading from 'components/loading';

const Home = loadable(() => import(
    /* webpackChunkName: "./modules/home" */ './modules/home'), {
  LoadingComponent: Loading,
});
const Mass = loadable(() => import(
    /* webpackChunkName: "./modules/mass" */ './modules/mass'), {
  LoadingComponent: Loading,
});
const Church = loadable(() => import(
    /* webpackChunkName: "./modules/church" */ './modules/church'), {
  LoadingComponent: Loading,
});
const Settings = loadable(() => import(
    /* webpackChunkName: "./modules/settings" */ './modules/settings'), {
  LoadingComponent: Loading,
});

export default [{
  exact: true,
  path: '/',
  component: Home,
}, {
  exact: false,
  path: '/masses',
  component: Mass,
}, {
  exact: false,
  path: '/churches',
  component: Church,
}, {
  exact: false,
  path: '/settings',
  component: Settings,
}];
