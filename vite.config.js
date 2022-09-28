import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { resolve } from 'path';
import { createProxy } from './src/http/local-proxy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/global.scss";',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 80,
    https: false,
    proxy: ({ ...createProxy() })
    // proxy: {
    //   '/api-': {
    //     target: '',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^(\/api-.*?\/)/, '')
    //   },
    // },
  },
})
