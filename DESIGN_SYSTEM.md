# Amora Vet — Design System (v3 · identidade original)

Fonte de verdade: `src/styles/tokens.css` · `tailwind.config.js` · `src/design-system/motion.ts`.

## Cores
| Token | Hex | Uso |
|---|---|---|
| `--c-laranja` | #FF893B | Fundo do hero, CTAs (texto marrom → 6,4:1) |
| `--c-laranja-2` | #FF9C35 | Hover de CTA |
| `--c-laranja-texto` | #A8480C | Laranja para textos e ícones pequenos (5,6:1 sobre branco) |
| `--c-amarelo` | #F4B900 | Círculo atrás do gato, coração, pontos e detalhes (nunca texto) |
| `--c-marrom` | #30251F | Títulos, textos, botão escuro e rodapé |
| `--c-bege` / `--c-fundo` | #F7EBDD | Seções Nosso espaço, Banho e tosa, Depoimentos, Contato |
| `--c-superficie` | #FFFFFF | Seções Sobre, Serviços, Equipe, Instagram, FAQ; botão claro |
| `--c-texto-2` | #6B5D53 | Texto secundário (6,4:1 branco · 5,3:1 bege) |

Distribuição: laranja só no hero (e em CTAs/detalhes); seções alternam branco e bege; rodapé marrom.

## Tipografia (self-hosted via @fontsource)
Sora 500–800 (títulos) · DM Sans 400–700 (texto) · Caveat 700 (frase manuscrita do hero).
H1 hero 32→56 px · H2 28→42 px · H3 20→24 px · texto 17 px.

## Componentes
Botões em dois padrões: **`.btn-primary`** (laranja + texto marrom; sobre fundo laranja `.on-brand` vira marrom + texto branco) e **`.btn-secondary`** (branco + texto marrom + borda suave) · modificadores `.btn-sm` · `.btn-icon` · `.link-arrow` · `.chip` / `.chip-demo` · `.icon-tile--marrom|amarelo|laranja` · `.card` · `.field` / `.input` · `BeforeAfterSlider` · `Space` (carrossel) · `.svc-card` · `FAQ` · `BookingModal` · `SectionTitle` · Decor (`Heart`, `Star`, `Paw`, `Sparkle`, `Wave` — também espelhada no topo do rodapé).

## Motion
Hero: entrada em sequência (frase → título → subtítulo → botões), gato com escala leve, decoração com flutuação/rotação curtas, parallax discreto. Demais seções: reveal suave, troca suave de categorias de serviço, fade do carrossel, animação automática contínua do comparador (pausa ao arrastar/teclado/foco, retoma após 3 s, botão de pausa). `prefers-reduced-motion` desativa tudo.
