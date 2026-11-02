# Amora Vet — Website demonstrativo

Landing page one-page para uma clínica veterinária + banho e tosa **fictícia**, criada como peça de portfólio da EV.
Stack: **React 18 + TypeScript + Vite 5 + Tailwind CSS 3 + GSAP 3 (ScrollTrigger) + Lucide React**.

> Este website é um projeto demonstrativo. A clínica, os profissionais, os depoimentos e as informações são fictícios.

## Rodar localmente

Requer Node.js 18+ (testado com Node 22).

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # verificação TypeScript
npm run build      # gera /dist (tsc + vite build)
npm run preview    # serve o build em http://localhost:4173
```

## Publicar no Cloudflare

### Cloudflare Pages (Git)
1. Suba o projeto para um repositório GitHub/GitLab.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Framework preset: **Vite** · Build command: `npm run build` · Output directory: `dist`.
4. (Opcional) Variável `NODE_VERSION=22`.

### Cloudflare Pages (upload direto)
```bash
npm run build
npx wrangler pages deploy dist --project-name amora-vet
```

### Cloudflare Workers (static assets)
O arquivo `wrangler.jsonc` já está configurado:
```bash
npm run build
npx wrangler deploy
```
O arquivo `public/_headers` define cache longo para `/assets` (arquivos com hash).

## Estrutura (v2 — refatoração clean)

Ordem da página: Header → Hero → Nosso espaço (carrossel) → Sobre → Serviços (cards com filtro) → Banho e tosa + Antes/Depois → Equipe → Depoimentos → Instagram → FAQ → Contato → Footer.

```
src/
  components/        Header, Hero, ScrollIndicator, About, Space, Services, Grooming,
                     BeforeAfterSlider, Team, Testimonials, Instagram, FAQ, Contact, Footer,
                     BookingModal (lazy), ui/
  data/site.ts       ← TODO o conteúdo (textos, serviços, imagens, equipe, contatos, links)
  design-system/     motion.ts (durações, easings, presets, media queries)
  hooks/             useGsap (gsap.context + cleanup), useSectionReveal, useBooking, useReducedMotion
  styles/            tokens.css (design tokens) e index.css (componentes)
  utils/             gsap.ts, booking.ts (validação + ponto de integração)
public/media/        vídeos e imagens otimizados
```

### Adaptar para outra clínica
1. Edite `src/data/site.ts` (nome, slogan, serviços, equipe, contatos, imagens).
2. Ajuste as cores em `src/styles/tokens.css` (e `colors` em `site.ts`).
3. Troque os arquivos em `public/media/` mantendo os nomes (ou altere os caminhos em `images`).

### Integrar agendamento real
`src/utils/booking.ts` → `submitBooking()` é o único ponto a trocar (API, CRM, sistema de reservas).
Para WhatsApp Business, preencha `contact.whatsappNumber` em `site.ts` e use `buildWhatsAppLink()`.
Hoje nenhum dado é enviado ou armazenado; o estado do formulário é descartado ao fechar o modal.

## Navegação
Menu orientado a tarefas, com 5 itens + Agendar: **A clínica** (Espaço, Sobre e Equipe), **Serviços**, **Banho e tosa**, **Dúvidas** e **Contato**. O item fica ativo enquanto qualquer seção do grupo está no centro da tela (`nav[].sections` em `site.ts`). Abaixo de 1280 px, o botão Agendar sai do header e aparece uma barra fixa de agendamento depois do hero (`StickyCTA`), que some sobre o rodapé e com o modal aberto.

## Assets

| Arquivo | Origem | Uso |
|---|---|---|
| `media/cta-gato.mp4` (+ poster) | Vídeo enviado (gato) | Hero |
| `media/border-collie-vet.mp4` (+ poster) | Vídeo enviado (Border Collie) | Seção Sobre. Recortado na área sem barras pretas (720×972) |
| `media/espaco-*.webp` | Fotos enviadas do espaço (consultório, sala de atendimento, espera, banho e tosa) | Carrossel "Conheça nosso espaço" (marcado como ilustrativo) e um recorte em `ig-atendimento.webp` |
| `media/tosa-antes.webp`, `tosa-depois.webp` | PNGs enviados do poodle | Comparador (4:5, máx. 400×500 px). Halos de recorte removidos, fundo creme, mesma escala nas duas fotos, com focinho, olhos e patas sobrepostos |
| `media/ig-*.webp` | Derivados acima | Prévia do Instagram |
| Fotos da equipe | — | Ilustrações placeholder (SVG) |

### Unidades e mapa
`units` em `site.ts`: com 2+ unidades o seletor aparece sozinho. `mapsUrl` ativa "Como chegar"; `mapEmbedUrl` troca o mapa ilustrativo por um iframe do Google Maps.

### Instagram real
Preencha `contact.instagramHandle` e `contact.instagramUrl` em `site.ts`. Com a URL vazia, o botão fica em estado demonstrativo. Não há integração com API, scraping ou métricas.

## Motion & acessibilidade
- GSAP sempre dentro de `gsap.context` (revertido no unmount) e `gsap.matchMedia` (desktop / mobile / movimento reduzido).
- Serviços: abas Veterinária / Banho e Tosa (setas do teclado), cards compactos; "Pedir informações" abre o modal com o serviço já selecionado.
- Nosso espaço: carrossel com fade a cada 4,5 s, pausa no hover/foco, ao interagir e com movimento reduzido.
- Rolagem nativa (sem Lenis) para preservar acessibilidade e evitar conflitos com ScrollTrigger.
- `prefers-reduced-motion`: sem animações de scroll, sem autoplay de vídeos e do comparador; conteúdo visível estático.
- Comparador antes/depois: `role="slider"`, setas/Shift/PageUp/PageDown/Home/End, Pointer Events (mouse, touch, caneta), `clip-path`.
- Modal com `<dialog>` nativo: foco preso, Esc, retorno de foco, validação com mensagens associadas.
- Accordion com `aria-expanded`/`aria-controls`/`role="region"` e `inert` nos itens fechados.

Design & Development by EV — https://evelymvasconcellos.com
