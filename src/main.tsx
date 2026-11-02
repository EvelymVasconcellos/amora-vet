import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Fontes self-hosted (sem dependência de CDN externo)
import '@fontsource/sora/500.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/sora/800.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/caveat/700.css';
import './styles/index.css';

// Sinaliza JS ativo: estilos de storytelling só se aplicam com JS (conteúdo acessível sem ele)
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
