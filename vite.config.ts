import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// base './' permite publicar em subpastas (Cloudflare Pages, previews, etc.)
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: { gsap: ['gsap', 'gsap/ScrollTrigger'], react: ['react', 'react-dom'] },
      },
    },
  },
});
