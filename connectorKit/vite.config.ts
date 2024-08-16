import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import react plugin
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  plugins: [react(), dts(), libInjectCss()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tokenbound-connector-v3',
      // the proper extensions will be added
      fileName: 'tokenbound-connector-v3',
    },
    rollupOptions: {
      external: ['starknet', 'react', 'react-dom'],
      output: {
        globals: {
          starknet: 'starknet', // Global variable name for 'starknet'
          react: 'react', // Global variable name for 'react'
          'react-dom': 'react-dom', // Global variable name for 'react-dom'
        },
      },
    },
    cssMinify: false,
  },
});
