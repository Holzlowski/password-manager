import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['crypto-js']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
});