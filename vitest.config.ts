import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  test: {
    testTimeout: 15000,
    environment: 'happy-dom', // Utiliser happy-dom pour l'environnement de test
    setupFiles: 'test/vitest/setup-file.ts', // Fichier de configuration initiale des tests
    include: [
      // Inclure les tests dans 'src' et 'test/vitest/__tests__'
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/vitest/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
  plugins: [vue(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});
