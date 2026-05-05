import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const target = env.VITE_API_URL || 'http://localhost:5000'; // ✅ FIX

  return {
    plugins: [
      react(),
      tailwindcss({
        config: './tailwind.config.js',
      }),
    ],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target, // ✅ use fallback
          changeOrigin: true,
        },
      },
    },
  };
});