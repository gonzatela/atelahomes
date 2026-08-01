window.propertyCatalog = [
  {
    slug: "poeta-joan-maragall",
    status: "rent",
    location: "Madrid · Poeta Joan Maragall",
    title: {
      es: "Vivienda amueblada con vistas panorámicas",
      en: "Furnished home with panoramic views"
    },
    price: { es: "1.700 €/mes", en: "€1,700/month" },
    priceValue: 1700,
    facts: {
      es: ["1 dormitorio", "1 baño", "Planta 19", "Portero"],
      en: ["1 bedroom", "1 bathroom", "19th floor", "Concierge"]
    },
    description: {
      es: "Vivienda amueblada para alquiler de larga estancia, situada en una planta alta con mucha luz y vistas privilegiadas sobre Madrid.",
      en: "A furnished long-term rental on a high floor, with abundant natural light and privileged views across Madrid."
    },
    images: Array.from({ length: 11 }, (_, index) => `/assets/properties/poeta-joan-maragall/${String(index + 1).padStart(2, "0")}.webp`)
  },
  {
    slug: "alberto-bosch",
    status: "sale",
    location: "Jerónimos · Retiro · Madrid",
    title: {
      es: "Vivienda reformada junto al Retiro",
      en: "Renovated home by El Retiro"
    },
    price: { es: "1.225.000 €", en: "€1,225,000" },
    priceValue: 1225000,
    facts: {
      es: ["100 m²", "2 dormitorios", "2 baños", "Planta 1ª"],
      en: ["100 m²", "2 bedrooms", "2 bathrooms", "1st floor"]
    },
    description: {
      es: "Vivienda reformada a 50 metros del Parque del Retiro, con salón luminoso, cocina equipada, dos dormitorios y dos baños completos.",
      en: "A renovated home 50 metres from El Retiro Park, with a bright living room, equipped kitchen, two bedrooms and two full bathrooms."
    },
    images: Array.from({ length: 13 }, (_, index) => `/assets/properties/alberto-bosch/${String(index + 1).padStart(2, "0")}.webp`)
  },
  {
    slug: "serrano-castellana-604ec",
    status: "sale",
    location: "Serrano · Castellana · Madrid",
    title: { es: "Una dirección excepcional en Serrano", en: "An exceptional address on Serrano" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["191 m²", "3 dormitorios", "3 baños", "A reformar"], en: ["191 m²", "3 bedrooms", "3 bathrooms", "To renovate"] },
    description: {
      es: "Una propiedad de gran potencial en una de las direcciones más prestigiosas del barrio de Salamanca, concebida como base para un proyecto a medida.",
      en: "A property with significant potential in one of Salamanca's most prestigious addresses, ready to become a tailored renovation project."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/serrano-castellana-604ec/0${number}.avif`)
  },
  {
    slug: "menendez-pelayo-recoletos",
    status: "sale",
    location: "Menéndez Pelayo · Recoletos · Madrid",
    title: { es: "Ático con terraza junto al Retiro", en: "Penthouse with a terrace by El Retiro" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["171 m²", "3 dormitorios", "3 baños", "Terraza de 20 m²"], en: ["171 m²", "3 bedrooms", "3 bathrooms", "20 m² terrace"] },
    description: {
      es: "Ático en una finca clásica de 1936 junto al Retiro, con vistas despejadas, techos altos, terraza privada, ascensor y servicio de conserjería.",
      en: "A penthouse in a classical 1936 building by El Retiro, with open views, high ceilings, a private terrace, lift and concierge service."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/menendez-pelayo-recoletos/0${number}.avif`)
  },
  {
    slug: "conde-de-penalver-goya",
    status: "sale",
    location: "Conde de Peñalver · Goya · Madrid",
    title: { es: "Un interior luminoso en Goya", en: "A bright interior home in Goya" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["68 m²", "2 dormitorios", "2 baños", "A reformar"], en: ["68 m²", "2 bedrooms", "2 bathrooms", "To renovate"] },
    description: {
      es: "Piso interior luminoso y de techos altos en una finca clásica rehabilitada, con una distribución flexible y excelente conexión urbana.",
      en: "A bright interior apartment with high ceilings in a restored classical building, offering a flexible layout and excellent city connections."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/conde-de-penalver-goya/0${number}.avif`)
  },
  {
    slug: "rios-rosas",
    status: "sale",
    location: "Ríos Rosas · Chamberí · Madrid",
    title: { es: "Vivienda señorial con ocho balcones", en: "A stately home with eight balconies" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["167 m²", "3 dormitorios", "3 baños", "8 balcones"], en: ["167 m²", "3 bedrooms", "3 bathrooms", "8 balconies"] },
    description: {
      es: "Vivienda exterior en una finca clásica de Chamberí, con techos altos y ocho balcones que aportan luz y amplitud a sus estancias.",
      en: "An exterior home in a classical Chamberí building, with high ceilings and eight balconies bringing light and openness to its rooms."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/rios-rosas/0${number}.avif`)
  },
  {
    slug: "garcia-de-paredes-almagro",
    status: "sale",
    location: "García de Paredes · Almagro · Madrid",
    title: { es: "Calma y luz en Almagro", en: "Calm and light in Almagro" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["93 m²", "3 dormitorios", "2 baños", "A reformar"], en: ["93 m²", "3 bedrooms", "2 bathrooms", "To renovate"] },
    description: {
      es: "Vivienda interior con orientación sur y techos de tres metros, tranquila y luminosa, con potencial para crear hasta tres dormitorios.",
      en: "A quiet, bright interior home with south-facing orientation and three-metre ceilings, with potential for up to three bedrooms."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/garcia-de-paredes-almagro/0${number}.avif`)
  },
  {
    slug: "castello-castellana",
    status: "sale",
    location: "Castelló · Castellana · Madrid",
    title: { es: "Vivienda reformada y amueblada en Castellana", en: "Renovated and furnished home in Castellana" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["276 m²", "3 dormitorios", "5 baños", "Parking y trastero"], en: ["276 m²", "3 bedrooms", "5 bathrooms", "Parking and storage"] },
    description: {
      es: "Amplia vivienda exterior reformada y amueblada, con una distribución equilibrada, parking y trastero en el barrio de Castellana.",
      en: "A spacious renovated and furnished exterior home, with a balanced layout, parking and storage in the Castellana neighbourhood."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/castello-castellana/0${number}.avif`)
  },
  {
    slug: "serrano-con-hermanos-becquer",
    status: "sale",
    location: "Serrano · Hermanos Bécquer · Madrid",
    title: { es: "Arquitectura clásica junto a Serrano", en: "Classical architecture by Serrano" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["241 m²", "3 dormitorios", "4 baños", "2 balcones"], en: ["241 m²", "3 bedrooms", "4 bathrooms", "2 balconies"] },
    description: {
      es: "Propiedad a reformar en una finca clásica, con techos altos y una ubicación privilegiada cerca del Museo Lázaro Galdiano y la calle Serrano.",
      en: "A renovation opportunity in a classical building, with high ceilings and a privileged location near the Lázaro Galdiano Museum and Serrano."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/serrano-con-hermanos-becquer/0${number}.avif`)
  },
  {
    slug: "lombia-goya",
    status: "sale",
    location: "Lombia · Goya · Madrid",
    title: { es: "Ático con terraza en Goya", en: "Penthouse with a terrace in Goya" },
    price: { es: "Precio a consultar", en: "Price on request" },
    priceValue: null,
    facts: { es: ["119 m²", "3 dormitorios", "2 baños", "Terraza de 13 m²"], en: ["119 m²", "3 bedrooms", "2 bathrooms", "13 m² terrace"] },
    description: {
      es: "Ático exterior en una finca clásica, con una amplia terraza y estancias luminosas en pleno barrio de Goya.",
      en: "An exterior penthouse in a classical building, with a generous terrace and bright rooms in the heart of Goya."
    },
    images: [1, 2, 3, 4, 5].map((number) => `/assets/properties/lombia-goya/0${number}.avif`)
  }
];
