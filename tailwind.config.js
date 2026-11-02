/** Tokens do Design System Amora Vet — espelham src/styles/tokens.css */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    extend: {
      colors: {
        laranja: { DEFAULT: 'var(--c-laranja)', 2: 'var(--c-laranja-2)', texto: 'var(--c-laranja-texto)', claro: 'var(--c-laranja-claro)' },
        amarelo: { DEFAULT: 'var(--c-amarelo)', claro: 'var(--c-amarelo-claro)' },
        marrom: 'var(--c-marrom)',
        bege: 'var(--c-bege)',
        fundo: 'var(--c-fundo)',
        neutro: 'var(--c-neutro)',
        superficie: 'var(--c-superficie)',
        texto: 'var(--c-texto)',
        suave: 'var(--c-texto-2)',
        linha: 'var(--c-linha)',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', '"Segoe Script"', 'cursive'],
      },
      borderRadius: { sm: 'var(--r-sm)', md: 'var(--r-md)', lg: 'var(--r-lg)', xl: 'var(--r-xl)' },
      boxShadow: { soft: 'var(--sh-soft)', lift: 'var(--sh-lift)' },
      zIndex: { content: '10', header: '50', overlay: '80', modal: '90' },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
