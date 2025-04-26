import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    // Use an absolute path to avoid confusion with relative paths
    outDir: path.resolve(__dirname, '../backend/wwwroot'), // Absolute path
    emptyOutDir: true, // Ensure the build output directory is cleared before new build
  },
});


