import type { App } from 'vue';
import DynamicRemoteComponentLoader from './DynamicRemoteComponentLoader.vue';

// Default export for Vue plugin installation
export default {
  install(app: App) {
    app.component('DynamicRemoteComponentLoader', DynamicRemoteComponentLoader);
  },
};

// Named export for direct component usage
export { DynamicRemoteComponentLoader };
