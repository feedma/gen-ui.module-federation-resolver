import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AstroModuleFederation',
      fileName: (format) => `index.${format === 'cjs' ? 'cjs' : format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['astro', '@originjs/vite-plugin-federation'],
      output: {
        globals: {
          astro: 'Astro',
          '@originjs/vite-plugin-federation': 'VitePluginFederation',
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
});
