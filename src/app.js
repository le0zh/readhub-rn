import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import dvaLoading from 'dva-loading';

import { registerScreens } from './screens';
import enterprise from './models/enterprise';

// init dva
const app = create({
  initialState: {},
  extraEnhancers: [],
  onError(e) {
    console.log('onError', e);
  },
});

// user plugin
app.use(
  dvaLoading({
    effects: true,
  })
);

// inject models
app.model(enterprise);

// start dva
app.start();

// get store
// eslint-disable-next-line no-underscore-dangle
const store = app._store;

registerScreens(store, Provider);

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.Topics',
    title: 'Readhub',
  },
  // drawer: {
  //   left: {
  //     screen: 'app.Menus',
  //     passProps: {},
  //     disableOpenGesture: true, // can the drawer be opened with a swipe instead of button (optional, Android only)
  //     fixedWidth: 500,
  //   },
  //   style: {
  //     // ( iOS only )
  //     drawerShadow: true, // optional, add this if you want a side menu drawer shadow
  //     // contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
  //     leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
  //     rightDrawerWidth: 50, // optional, add this if you want a define right drawer width (50=percent)
  //   },
  //   type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
  //   animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
  //   // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
  //   disableOpenGesture: true, // optional, can the drawer, both right and left, be opened with a swipe instead of button
  // },
  appStyle: {
    keepStyleAcrossPush: false,
    navBarBackgroundColor: '#37363B',
    statusBarTextColorScheme: 'light',
    disabledBackGesture: false,
    navBarLeftButtonColor: '#EEEEED',
    navBarButtonColor: '#EEEEED',
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
