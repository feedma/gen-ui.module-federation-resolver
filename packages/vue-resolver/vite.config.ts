import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DynamicRemoteComponentLoader',
      fileName: (format) => `index.${format === 'cjs' ? 'cjs' : format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '__federation__'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          '__federation__': '__federation__',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({ 
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
});
