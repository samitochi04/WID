import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Keep your existing configuration for this dependency
  },
  resolve: {
    alias: [
      {
        find: 'crypto',
        replacement: 'crypto-browserify', // Optionally use if you need crypto module
      },
      {
        find: 'buffer',
        replacement: 'buffer', // Alias for browser Buffer polyfill
      },
    ],
  },
});
