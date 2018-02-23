import { Navigation } from 'react-native-navigation';

import Topics from './Topics';
import Menus from './Menus';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.Topics', () => Topics, store, Provider);
  Navigation.registerComponent('app.Menus', () => Menus, store, Provider);
}
