import { Navigation } from 'react-native-navigation';

import Chat from './Chat';
import Consultant from './Consultant';
import Enterprise from './Enterprise';
import MailBox from './MailBox';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.ChatPage', () => Chat, store, Provider);
  Navigation.registerComponent('app.ConsultantPage', () => Consultant, store, Provider);
  Navigation.registerComponent('app.EnterprisePage', () => Enterprise, store, Provider);
  Navigation.registerComponent('app.MailBox', () => MailBox, store, Provider);
}
