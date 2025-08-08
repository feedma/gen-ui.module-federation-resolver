import type { App } from 'vue';
import DynamicRemoteLoader from './DynamicRemoteComponentLoader.vue';

export default {
  install(app: App) {
    app.component('DynamicRemoteLoader', DynamicRemoteLoader);
  },
};

export { DynamicRemoteLoader };
