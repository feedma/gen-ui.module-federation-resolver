import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DynamicRemoteComponentLoader',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [
        'react', 
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '__federation__'
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react/jsx-runtime': 'React',
          'react/jsx-dev-runtime': 'React',
          '__federation__': '__federation__',
        },
      },
    },
  },
  plugins: [
    react(),
    dts({ insertTypesEntry: true })
  ]
})
