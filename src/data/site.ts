/**
 * ARQUIVO DE CONFIGURAÇÃO CENTRAL — Amora Vet (projeto demonstrativo)
 * --------------------------------------------------------------------
 * Para transformar esta demo no site de outra clínica, edite apenas este
 * arquivo (textos, serviços, equipe, contatos, imagens, links) e os tokens
 * de cor em src/styles/tokens.css. Todos os dados abaixo são FICTÍCIOS.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Stethoscope, Syringe, ClipboardCheck, Baby, ShowerHead, Sparkles, Microscope, Apple, Droplets, PawPrint, Ear,
  Scissors, HeartHandshake,
} from 'lucide-react';

const media = (file: string) => `./media/${file}`;

export const brand = {
  name: 'Amora Vet',
  signature: 'Clínica Veterinária & Banho e Tosa',
  slogan: 'Amor que cuida. Carinho que transforma.',
  credits: { label: 'Design & Development by EV', url: 'https://evelymvasconcellos.com' },
  disclaimer:
    'Este website é um projeto demonstrativo desenvolvido para apresentação de serviços de design e desenvolvimento. A clínica, os profissionais, os depoimentos e as informações apresentadas são fictícios.',
};

/** Paleta — fonte de verdade em tokens.css */
export const colors = {
  laranja: '#FF893B', laranja2: '#FF9C35', amarelo: '#F4B900',
  marrom: '#30251F', branco: '#FFFFFF', bege: '#F7EBDD',
} as const;

/**
 * Menu orientado a tarefas (5 itens + Agendar). `sections` agrupa as seções
 * da página que deixam o item ativo durante a rolagem.
 */
export const nav = [
  { label: 'A clínica', href: '#espaco', sections: ['espaco', 'sobre', 'equipe'] },
  { label: 'Serviços', href: '#servicos', sections: ['servicos'] },
  { label: 'Banho e tosa', href: '#banho-e-tosa', sections: ['banho-e-tosa'] },
  { label: 'Dúvidas', href: '#faq', sections: ['faq'] },
  { label: 'Contato', href: '#contato', sections: ['contato'] },
]

/**
 * Contatos demonstrativos: nenhum dado real, nada vira link funcional
 * enquanto os campos `*Url` / `whatsappNumber` estiverem vazios.
 */
export const contact = {
  whatsappDisplay: '(00) 00000-0000',
  whatsappNumber: '' as string, // ex.: '5511999999999'
  instagramHandle: '@amoravet.demo',
  instagramUrl: '' as string,   // ex.: 'https://instagram.com/perfil-real'
};

/**
 * Unidades. Hoje há uma unidade demonstrativa. Com 2+ unidades,
 * o seletor aparece automaticamente na seção de contato.
 * `mapsUrl` vazio = botão "Como chegar" desativado e mapa ilustrativo.
 */
export interface Unit {
  id: string; name: string; description: string;
  street: string; district: string; city: string; state: string;
  hours: { days: string; time: string }[];
  mapsUrl: string; mapEmbedUrl: string; demo: boolean;
}
export const units: Unit[] = [
  {
    id: 'principal', name: 'Amora Vet', description: 'Clínica Veterinária & Banho e Tosa', demo: true,
    street: 'Rua Exemplo, 000', district: 'Bairro Exemplo', city: 'Cidade Exemplo', state: 'UF',
    hours: [{ days: 'Segunda a sexta', time: '8h às 19h' }, { days: 'Sábado', time: '8h às 14h' }, { days: 'Domingo', time: 'Fechado' }],
    mapsUrl: '', mapEmbedUrl: '',
  },
];

export const images = {
  heroVideo: media('cta-gato.mp4'),
  heroPoster: media('cta-gato-poster.webp'),
  aboutVideo: media('border-collie-vet.mp4'),
  aboutPoster: media('border-collie-vet-poster.webp'),
  espacoConsultorio: media('espaco-consultorio.webp'),
  espacoAtendimento: media('espaco-atendimento.webp'),
  espacoEspera: media('espaco-espera.webp'),
  espacoBanhoTosa: media('espaco-banho-tosa.webp'),
  before: media('tosa-antes.webp'),
  after: media('tosa-depois.webp'),
};

export const hero = {
  handwritten: 'Cuidado que vem do coração!',
  title: 'Seu pet merece todo esse amor!',
  subtitle: 'Saúde, carinho e beleza em um só lugar.',
  primary: { label: 'Agendar consulta', service: 'Consulta veterinária' as BookingService },
  secondary: { label: 'Agendar banho e tosa', service: 'Banho e tosa' as BookingService },
  videoAlt: 'Gato cinza espiando por cima de uma mesa, com a patinha apoiada',
};

export const about = {
  eyebrow: 'Sobre a Amora Vet',
  title: 'Mais que uma clínica. Um lugar cheio de amor.',
  paragraphs: [
    'Na Amora Vet, acreditamos que cada pet merece atenção, carinho e cuidados especiais.',
    'Por isso, reunimos serviços veterinários e banho e tosa em um ambiente acolhedor, pensado para proporcionar conforto, segurança e bem-estar em cada visita.',
  ],
  highlight: 'Cuidamos de quem faz parte da sua família.',
  videoAlt: 'Border Collie segurando um estetoscópio na boca, sobre fundo amarelo',
};

export const space = {
  eyebrow: 'Conheça nosso espaço',
  title: 'Um espaço feito para cuidar com amor.',
  paragraphs: [
    'Na Amora Vet, cada detalhe é pensado para oferecer conforto, segurança e carinho aos nossos amigos de quatro patas.',
    'Um ambiente acolhedor para cuidar da saúde, higiene e bem-estar do seu pet.',
  ],
  notice: 'Imagens ilustrativas',
  intervalMs: 4500,
  slides: [
    { key: 'espacoConsultorio', label: 'Consultório veterinário', alt: 'Veterinária examinando um golden retriever sobre a mesa de atendimento laranja', pos: '50% 62%' },
    { key: 'espacoAtendimento', label: 'Sala de atendimento', alt: 'Vista de cima da sala de atendimento, com mesa em formato de osso e poltronas laranja', pos: '50% 45%' },
    { key: 'espacoEspera', label: 'Ambiente de espera', alt: 'Sala de espera com banco, puff laranja e um painel com cachorro e gato', pos: '50% 60%' },
    { key: 'espacoBanhoTosa', label: 'Espaço de banho e tosa', alt: 'Espaço de banho e tosa com banheira, cachorro e baias laranja', pos: '50% 55%' },
  ] as { key: 'espacoConsultorio' | 'espacoAtendimento' | 'espacoEspera' | 'espacoBanhoTosa'; label: string; alt: string; pos: string }[],
};

export type BookingService =
  | 'Consulta veterinária' | 'Vacinação' | 'Check-up' | 'Banho' | 'Tosa' | 'Banho e tosa' | 'Outros cuidados';

export const bookingServices: BookingService[] = [
  'Consulta veterinária', 'Vacinação', 'Check-up', 'Banho', 'Tosa', 'Banho e tosa', 'Outros cuidados',
];

export interface ServiceItem { id: string; title: string; text: string; icon: LucideIcon; booking: BookingService }

export const services = {
  eyebrow: 'Nossos serviços',
  title: 'Cuidado completo para o seu pet.',
  subtitle: 'Saúde, prevenção e bem-estar em cada etapa da vida.',
  cta: 'Pedir informações',
  categories: [
    {
      id: 'veterinaria', label: 'Veterinária',
      items: [
        { id: 'consultas', title: 'Consultas veterinárias', text: 'Atendimento clínico e acompanhamento da saúde do pet.', icon: Stethoscope, booking: 'Consulta veterinária' },
        { id: 'vacinacao', title: 'Vacinação', text: 'Proteção e prevenção para uma vida saudável.', icon: Syringe, booking: 'Vacinação' },
        { id: 'checkup', title: 'Check-up', text: 'Avaliações preventivas e acompanhamento periódico.', icon: ClipboardCheck, booking: 'Check-up' },
        { id: 'exames', title: 'Exames', text: 'Procedimentos de apoio à avaliação da saúde animal.', icon: Microscope, booking: 'Consulta veterinária' },
        { id: 'filhotes', title: 'Cuidados com filhotes', text: 'Orientação e acompanhamento nos primeiros meses de vida.', icon: Baby, booking: 'Consulta veterinária' },
        { id: 'nutricao', title: 'Orientação nutricional', text: 'Cuidados para uma alimentação equilibrada.', icon: Apple, booking: 'Consulta veterinária' },
      ] as ServiceItem[],
    },
    {
      id: 'banho-tosa', label: 'Banho e Tosa',
      items: [
        { id: 'banho', title: 'Banho completo', text: 'Higiene e conforto com atenção a cada detalhe.', icon: ShowerHead, booking: 'Banho' },
        { id: 'tosa-hig', title: 'Tosa higiênica', text: 'Limpeza e cuidados para o dia a dia.', icon: Scissors, booking: 'Tosa' },
        { id: 'tosa-pers', title: 'Tosa personalizada', text: 'Cuidados com a pelagem conforme as necessidades do pet.', icon: Sparkles, booking: 'Tosa' },
        { id: 'hidratacao', title: 'Hidratação', text: 'Tratamento para cuidar da pelagem.', icon: Droplets, booking: 'Banho e tosa' },
        { id: 'unhas', title: 'Corte de unhas', text: 'Cuidados para o conforto das patinhas.', icon: PawPrint, booking: 'Outros cuidados' },
        { id: 'ouvidos', title: 'Higienização de ouvidos', text: 'Higiene adequada conforme a necessidade do animal.', icon: Ear, booking: 'Outros cuidados' },
      ] as ServiceItem[],
    },
  ],
};

export const grooming = {
  eyebrow: 'Banho e tosa: carinho que transforma.',
  title: 'Um banho de carinho e uma transformação cheia de charme.',
  text: 'Oferecemos cuidados de higiene e estética respeitando as características e necessidades de cada pet.',
  points: [
    { title: 'Banho com carinho', text: 'Produtos e temperatura adequados a cada pelagem.', icon: ShowerHead },
    { title: 'Tosa com atenção', text: 'Acabamento de acordo com a raça e a rotina do pet.', icon: Scissors },
    { title: 'Conforto do início ao fim', text: 'Pausas e manejo tranquilo durante o atendimento.', icon: HeartHandshake },
  ],
  sliderTitle: 'Uma transformação cheia de carinho.',
  sliderSubtitle: 'Arraste para descobrir o antes e depois do banho e tosa.',
  beforeLabel: 'Antes',
  afterLabel: 'Depois',
  beforeAlt: 'Poodle de pelagem cacheada longa e despenteada, antes da tosa',
  afterAlt: 'O mesmo poodle com a pelagem tosada e modelada, depois da tosa',
  cta: 'Agendar banho e tosa',
  note: 'Imagens ilustrativas.',
};

export const team = {
  eyebrow: 'Equipe',
  title: 'Pessoas que amam cuidar de patinhas.',
  notice: 'Perfis ilustrativos. Nomes e funções fictícios, sem registros profissionais.',
  members: [
    { name: 'Dra. Amanda Exemplo', role: 'Médica veterinária', text: 'Conduz consultas e acompanhamento preventivo com calma e escuta atenta.', tone: 'marrom' },
    { name: 'Rafa Exemplo', role: 'Banho e tosa', text: 'Cuida da higiene e da estética respeitando o tempo de cada pet.', tone: 'amarelo' },
    { name: 'Lia Exemplo', role: 'Auxiliar de cuidados pet', text: 'Recebe, acolhe e acompanha os pets durante toda a visita.', tone: 'laranja' },
  ] as { name: string; role: string; text: string; tone: 'marrom' | 'amarelo' | 'laranja' }[],
};

export const testimonials = {
  eyebrow: 'Depoimentos',
  title: 'Quem ama, recomenda!',
  notice: 'Exemplos ilustrativos — não são avaliações reais ou verificadas.',
  items: [
    { name: 'Tutora Exemplo A', pet: 'Pet: Paçoca', initials: 'TA', rating: 5, text: 'Atendimento muito carinhoso! Meu cachorro ficou super tranquilo durante toda a visita.' },
    { name: 'Tutor Exemplo B', pet: 'Pet: Mel', initials: 'TB', rating: 5, text: 'Adorei o cuidado no banho e tosa. O resultado ficou lindo!' },
    { name: 'Tutora Exemplo C', pet: 'Pet: Biscoito', initials: 'TC', rating: 5, text: 'Um espaço acolhedor, com uma proposta de atendimento muito especial.' },
  ],
};

export const instagram = {
  title: 'Acompanhe a Amora Vet.',
  subtitle: 'Dicas de cuidados, novidades e momentos especiais dos nossos amigos de quatro patas.',
  cta: 'Seguir no Instagram',
  follow: 'Seguir',
  footer: 'Momentos especiais • Mais no perfil',
  demoNote: 'Perfil demonstrativo. Os botões serão ativados quando o perfil oficial for configurado.',
  posts: [
    { src: media('ig-pos-banho.webp'), alt: 'Poodle depois do banho e tosa' },
    { src: media('ig-gato.webp'), alt: 'Gato cinza levantando a patinha' },
    { src: media('ig-atendimento.webp'), alt: 'Veterinária examinando um golden retriever' },
  ],
};

export const faq = {
  eyebrow: 'Perguntas frequentes',
  title: 'Ficou alguma dúvida?',
  items: [
    { q: 'Preciso agendar o atendimento?', a: 'Recomendamos que sim. Com hora marcada, seu pet espera menos e a equipe já se prepara para recebê-lo.' },
    { q: 'A clínica oferece banho e tosa?', a: 'Sim! Você pode cuidar da saúde e da higiene do seu pet no mesmo lugar, e até na mesma visita.' },
    { q: 'Vocês atendem filhotes?', a: 'Sim. Acompanhamos os primeiros meses de vida com orientações sobre vacinas, alimentação e rotina.' },
    { q: 'Como funciona o banho e tosa?', a: 'Avaliamos a pelagem e o comportamento do pet e escolhemos produtos, temperatura e tipo de tosa adequados a ele.' },
    { q: 'Como posso agendar?', a: 'Toque em "Agendar horário", escolha o serviço e o melhor dia. Em seguida, nossa equipe confirma com você.' },
  ],
};

export const contactSection = {
  eyebrow: 'Contato',
  title: 'Onde encontrar a Amora Vet?',
  subtitle: 'Confira nossas informações e saiba como chegar até nós.',
  directions: 'Como chegar',
  cta: 'Agendar horário',
  demoNotice: 'Localização demonstrativa. O mapa será exibido quando o endereço real for configurado.',
};

export const booking = {
  title: 'Agendar horário',
  intro: 'Conte um pouco sobre você e seu pet. Leva menos de um minuto.',
  demoNotice: 'Demonstração: nenhum dado é enviado ou armazenado.',
  animalTypes: ['Cachorro', 'Gato', 'Outro'],
  times: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  successTitle: 'Solicitação demonstrativa recebida!',
  successText: 'Esta é uma simulação de agendamento. Nenhuma reserva real foi realizada.',
};
