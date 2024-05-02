import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import {BACKEND_URL} from "./src/config.js"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target:  BACKEND_URL,
        // target:  `'http://localhost:2020'`,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
