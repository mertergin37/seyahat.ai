import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        quiz: resolve(__dirname, 'quiz.html'),
        profil: resolve(__dirname, 'profil.html'),
        destinasyon: resolve(__dirname, 'destinations/destinasyon.html'),
        cerez: resolve(__dirname, 'cerez-politikasi.html'),
        gizlilik: resolve(__dirname, 'gizlilik-sozlesmesi.html'),
        kullanim: resolve(__dirname, 'kullanim-kosullari.html'),
      }
    }
  }
});
