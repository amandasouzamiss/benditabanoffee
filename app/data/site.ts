export const site = {
  name: "Bendita Banoffee",

  slogan: "A Casa da Banoffee",

  description:
    "Banoffees artesanais, cafés especiais, sobremesas e um ambiente acolhedor em Nova Prata.",

  about:
    "A Bendita nasceu para transformar cafés, sobremesas e encontros em momentos especiais. Cada produto é preparado artesanalmente, com ingredientes selecionados e aquele cuidado que faz cada visita ser única.",

  instagram: "https://www.instagram.com/benditabanoffeenp/",

  ordersUrl: "https://pedidos.benditabanoffee.com.br/",

  // WhatsApp de atendimento geral (botão flutuante, seção de localização).
  whatsappUrl: "https://wa.me/5554996852328",

  // Número (só dígitos, com DDI) usado pelo configurador de encomendas.
  // Mesmo número de site.whatsappUrl — padronizado em todo o site.
  ordersWhatsappNumber: "5554996852328",

  // ID de métricas do Google Analytics 4 (formato G-XXXXXXXXXX).
  googleAnalyticsId: "G-1L20DPTG7R",

  mapsUrl:
    "https://www.google.com/maps/place/Bendita+Banoffee/data=!4m2!3m1!1s0x0:0x87f917e239eb60f7?sa=X&ved=1t:2428&ictx=111",

  mapsEmbed:
    "https://www.google.com/maps?q=Travessa%20%C3%82ngelo%20Lorencet%2027,%20Centro,%20Nova%20Prata,%20RS&output=embed",

  address:
    "Bendita Banoffee\nTravessa Ângelo Lorencet, 27\nCentro • Nova Prata/RS",

  hours: [
    "Segunda, quarta, quinta e sexta • 13h30 às 19h30",
    "Sábado e domingo • 14h às 20h",
    "Terça-feira • Fechado",
  ],

  phone: "(54) 99685-2328",
};

export const navigation = [
  { label: "A Bendita", href: "/#sobre" },
  { label: "Destaques", href: "/#destaques" },
  { label: "Cestas", href: "/cestas" },
  { label: "Tortas", href: "/tortas" },
  { label: "Eventos", href: "/eventos" },
  { label: "Encomendas", href: "/encomendar" },
  { label: "Localização", href: "/#localizacao" },
];

export const highlights = [
  {
    title: "Banoffees",
    description:
      "Banoffees artesanais preparadas com banana, doce de leite, creme e muito carinho.",
    image: "/images/banoffee.jpg",
  },
  {
    title: "Cafés",
    description:
      "Cafés especiais preparados para acompanhar cada momento do seu dia.",
    image: "/images/cafe.jpg",
  },
  {
    title: "Sobremesas",
    description:
      "Sobremesas artesanais que transformam qualquer pausa em uma experiência.",
    image: "/images/sobremesa.jpg",
  },
  {
    title: "Salgados",
    description:
      "Opções salgadas perfeitas para um café, almoço leve ou encontro especial.",
    image: "/images/salgados.jpg",
  },
  {
    title: "Bebidas geladas",
    description:
      "Bebidas cremosas e refrescantes para todas as estações.",
    image: "/images/bebidas.jpg",
  },
  {
  title: "Encomendas",
  description:
    "Tortas e sobremesas especiais para aniversários, encontros e celebrações.",
  image: "/images/orders.jpg",
},
];


export const tortas = [
  {
    name: "Torta de Banoffee",
    description:
      "A clássica da casa: camadas de biscoito amanteigado, doce de leite, banana fresca e chantilly.",
    price: "R$ 179,90",
  },
  {
    name: "Cheese Cake",
    description:
      "Base amanteigada e recheio cremoso de cream cheese, com calda especial.",
    price: "R$ 189,90",
  },
  {
    name: "Torta de Maçã com Canela",
    description:
      "Maçãs frescas e canela sobre uma massa crocante e amanteigada.",
    price: "R$ 179,90",
  },
  {
    name: "Torta Uvanoffee",
    description:
      "Nossa banoffee em uma versão especial, com uvas frescas para um toque surpreendente.",
    price: "R$ 240,90",
  },
  {
    name: "Torta Choconoffee",
    description:
      "O encontro da banoffee com o chocolate: intensa, cremosa e irresistível.",
    price: "R$ 189,90",
  },
  {
    name: "Torta Holandesa",
    description:
      "Creme de ovos aveludado sobre base crocante, finalizada com raspas de chocolate.",
    price: "R$ 229,90",
  },
  {
    name: "Chocolate com Morango",
    description:
      "Chocolate cremoso e morangos frescos em camadas irresistíveis.",
    price: "R$ 229,90",
  },
  {
    name: "Torta de Limão",
    description:
      "Creme de limão fresquinho sobre base crocante, no equilíbrio perfeito entre doce e cítrico.",
    price: "R$ 179,90",
  },
];

export const cestas = {
  priceFrom: "R$ 130,00",
  priceTo: "R$ 350,00",
  description:
    "Cestas artesanais para presentear e celebrar — aniversário, uma data a dois, um agradecimento ou um presente corporativo. Montadas à mão, com curadoria de sabores, texturas e aromas, e entregues de manhã, à tarde ou à noite.",
  includes: [
    {
      title: "Pães, croissants, bolos e biscoitos",
      description: "Recém-preparados — a base que sustenta a degustação.",
    },
    {
      title: "Queijos e charcutarias selecionadas",
      description:
        "Uma seleção pensada para dar personalidade à experiência.",
    },
    {
      title: "Frutas frescas da estação",
      description:
        "O melhor da estação, para limpar o paladar e equilibrar os sabores.",
    },
    {
      title: "Chocolates, doces e espalháveis",
      description:
        "Um mimo açucarado, com geleia, doce de leite ou manteiga para o croissant.",
    },
    {
      title: "Drip coffee e bebida para brindar",
      description:
        "Café coado de sachê e mais sucos, vinho ou espumante.",
    },
    {
      title: "Montagem cuidadosa e especial",
      description:
        "Cesta artesanal e personalizada, mesclando alturas, texturas, cores e aromas para os cinco sentidos.",
    },
  ],
  gallery: [
    "/images/cestas/cesta-1.jpg",
    "/images/cestas/cesta-2.jpg",
    "/images/cestas/cesta-3.jpg",
    "/images/cestas/cesta-4.jpg",
    "/images/cestas/cesta-5.jpg",
    "/images/cestas/cesta-6.jpg",
    "/images/cestas/cesta-7.jpg",
  ],
};

export const eventos = {
  description:
    "Do espaço da Bendita ao local da sua celebração — organizamos aniversários, casamentos, formaturas e eventos corporativos com o sabor e o cuidado da casa.",
  options: [
    {
      title: "No nosso espaço",
      description:
        "Reserve o espaço da Bendita em Nova Prata para o seu evento, com toda a estrutura e o clima acolhedor da casa.",
    },
    {
      title: "No seu evento",
      description:
        "Levamos tortas, cestas, doces e salgados até o local da sua celebração, em Nova Prata e região.",
    },
  ],
  occasions: [
    "Aniversário",
    "Casamento",
    "Formatura",
    "Evento corporativo",
    "Chá de bebê ou revelação",
    "Confraternização",
  ],
  gallery: [
    "/images/eventos/evento-1.jpg",
    "/images/eventos/evento-2.jpg",
    "/images/eventos/evento-6.jpg",
    "/images/eventos/evento-3.jpg",
    "/images/eventos/evento-7.jpg",
    "/images/eventos/evento-4.jpg",
    "/images/eventos/evento-9.jpg",
    "/images/eventos/evento-8.jpg",
    "/images/eventos/evento-5.jpg",
  ],
};

// ————————————————————————————————————————————————
// Configurador de encomendas (tortas, cestas e eventos)
// ————————————————————————————————————————————————

// Antecedência mínima, em dias, para cada tipo de encomenda.
export const orderLeadDays = {
  tortas: 3,
  cestas: 2,
  eventos: 7,
};

// Dias da semana em que a loja não retira/entrega encomendas (0 = domingo).
export const orderClosedWeekdays = [2]; // terça-feira

export const tortaSizes = [
  {
    id: "pequena",
    label: "Pequena",
    detail: "Aproximadamente 12 a 15 fatias",
  },
  {
    id: "media",
    label: "Média",
    detail: "Aproximadamente 20 a 25 fatias",
  },
  {
    id: "grande",
    label: "Grande",
    detail: "Aproximadamente 30 a 35 fatias",
  },
  {
    id: "indefinido",
    label: "Ainda não sei",
    detail: "A gente te ajuda a escolher pelo WhatsApp",
  },
];

export const cestaOccasions = [
  "Aniversário",
  "Data romântica",
  "Presente corporativo",
  "Dia das Mães / Dia dos Pais",
  "Agradecimento ou mimo",
  "Boas-vindas",
  "Outra ocasião",
];

export const cestaSizes = [
  {
    id: "p",
    label: "Cesta P",
    detail:
      "Para 1 pessoa — pães, um tipo de frio e queijo, uma fruta, um doce e bebida individual.",
  },
  {
    id: "m",
    label: "Cesta M",
    detail:
      "Para 2 pessoas — variedade maior de frios e queijos, frutas, doces e bebida para dividir.",
  },
  {
    id: "g",
    label: "Cesta G",
    detail:
      "Para 2 a 4 pessoas ou presente especial — seleção completa, com espumante ou vinho e mais mimos.",
  },
  {
    id: "indefinido",
    label: "Ainda não sei",
    detail: "Conte a ocasião e a gente sugere o tamanho ideal.",
  },
];

export const cestaExtras = [
  { id: "vinho", label: "Vinho" },
  { id: "espumante", label: "Espumante" },
  { id: "suco", label: "Suco integral" },
  { id: "cartao", label: "Cartão escrito à mão" },
  { id: "flores", label: "Arranjo de flores" },
  { id: "personalizado", label: "Item personalizado" },
];

export const eventTypes = [
  "Aniversário",
  "Casamento",
  "Formatura",
  "Evento corporativo",
  "Chá de bebê ou revelação",
  "Outro",
];

export const eventLocations = [
  {
    id: "espaco",
    label: "No espaço da Bendita",
    detail: "Travessa Ângelo Lorencet, 27 — Centro, Nova Prata",
  },
  {
    id: "externo",
    label: "Vocês vão até o local do evento",
    detail: "Em Nova Prata e região",
  },
];

export const eventGuestRanges = [
  { id: "ate20", label: "Até 20 convidados" },
  { id: "20a50", label: "20 a 50 convidados" },
  { id: "50a100", label: "50 a 100 convidados" },
  { id: "mais100", label: "Mais de 100 convidados" },
];

export const eventServices = [
  { id: "mesa-doces", label: "Mesa de doces" },
  { id: "tortas", label: "Tortas" },
  { id: "cestas", label: "Cestas de mimos" },
  { id: "salgados", label: "Salgados" },
  { id: "bebidas", label: "Bebidas" },
  { id: "decoracao", label: "Decoração temática" },
];

