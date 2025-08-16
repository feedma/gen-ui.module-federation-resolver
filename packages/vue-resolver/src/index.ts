import type { App } from 'vue';
import DynamicRemoteComponentLoader from './DynamicRemoteComponentLoader.vue';

export default {
  install(app: App) {
    app.component('DynamicRemoteComponentLoader', DynamicRemoteComponentLoader);
  },
};

export { DynamicRemoteComponentLoader };
