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
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Enterprise',
      screen: 'app.EnterprisePage',
      icon: require('./img/default.png'),
      // selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Enterprise',
    },
    {
      label: 'Consultant',
      screen: 'app.ConsultantPage',
      icon: require('./img/default.png'),
      // selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Consultant',
    },
    {
      label: 'Chat',
      screen: 'app.ChatPage',
      icon: require('./img/default.png'),
      // selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Chat',
    },
    {
      label: 'MailBox',
      screen: 'app.MailBox',
      icon: require('./img/default.png'),
      // selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'MailBox',
    },
  ],
});
