import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tokenbound-connector',
      // the proper extensions will be added
      fileName: 'tokenbound-connector',
    },
    rollupOptions: {
      external: ["starknet"],
    },
  },
  plugins: [dts(), react()],
})