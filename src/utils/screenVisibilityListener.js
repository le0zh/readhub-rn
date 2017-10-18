import { ScreenVisibilityListener as RNNScreenVisibilityListener } from 'react-native-navigation';
import logger from './logger';

// 可见性阶段：
// willAppear -> didAppear -> willDisappear -> didDisappear

class ScreenVisibilityListener {
  constructor() {
    this.coreListener = new RNNScreenVisibilityListener({
      willAppear: ({ screen, commandType }) => {
        logger.log('screenVisibility', `Screen ${screen} willAppear via [${commandType}]`);
        this.listeners.forEach(callback => {
          callback(screen);
        });
      },

      didAppear: ({ screen, startTime, endTime, commandType }) => {
        // logger.log(
        //   'screenVisibility',
        //   `Screen ${screen} displayed in ${endTime - startTime} millis after [${commandType}]`
        // );
      },
    });

    this.listeners = [];
  }

  register() {
    this.coreListener.register();
  }

  unregister() {
    if (this.coreListener) {
      this.coreListener.unregister();
      this.coreListener = null;
    }
  }

  listen(callback) {
    this.listeners.push(callback);
  }
}

const listener = new ScreenVisibilityListener();
listener.register();

export default listener;
