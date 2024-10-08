import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tokenbound-sdk',
      // the proper extensions will be added
      fileName: 'starknet-tokenbound-sdk',
    },
    rollupOptions: {
      external: ["starknet"],
    },
  },
  plugins: [dts()],
  optimizeDeps: {
    exclude: ['**/__test__/**', '**/*.test.ts', '**/*.spec.ts'],
  },
})