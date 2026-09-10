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
  ordersWhatsappNumber: "5551997771220",

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
    price: "R$ 140,00",
  },
  {
    name: "Torta Uvanoffe",
    description:
      "Nossa banoffee em uma versão especial, com uvas frescas para um toque surpreendente.",
    price: "R$ 240,90",
  },
  {
    name: "Torta Choconoffe",
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
    price: "R$ 114,90",
  },
];

export const cestas = {
  priceNote: "Consulte tamanhos e valores",
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

// ————————————————————————————————————————————————
// Configurador de encomendas (tortas e cestas)
// ————————————————————————————————————————————————

// Antecedência mínima, em dias, para cada tipo de encomenda.
export const orderLeadDays = {
  tortas: 3,
  cestas: 2,
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

