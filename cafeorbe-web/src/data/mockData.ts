import { Lote, Producto, Subasta, Usuario, Pedido } from "../types";

// Imágenes de alta resolución de café de especialidad
export const COFFEE_IMAGES = {
  geisha: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  bourbon: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80",
  castillo: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
  chiroso: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
  wush: "https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80",
  maragogype: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80",
  plantation: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1200&q=80",
  harvest: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80",
  cupping: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80",
  roast: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80"
};

export const MOCK_USUARIOS: Record<string, Usuario> = {
  comprador: {
    id: "u-comprador-01",
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@cafeorbe.com",
    celular: "+57 312 456 7890",
    direccion: "Carrera 7 # 115-45, Apto 802",
    municipio: "Bogotá D.C.",
    departamento: "Cundinamarca",
    codigoPostal: "110111",
    rol: "COMPRADOR",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  vendedor: {
    id: "u-vendedor-01",
    nombre: "Don Hernando Gómez",
    email: "hernando@fincaelparaiso.co",
    celular: "+57 314 987 6543",
    direccion: "Vereda El Cedro, Km 4 Vía San Adolfo",
    municipio: "Pitalito",
    departamento: "Huila",
    codigoPostal: "417030",
    rol: "VENDEDOR",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  admin: {
    id: "u-admin-01",
    nombre: "Valeria Restrepo",
    email: "admin@cafeorbe.com",
    celular: "+57 300 123 4567",
    direccion: "Plataforma Central CafeOrbe",
    municipio: "Armenia",
    departamento: "Quindío",
    rol: "ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }
};

export const MOCK_LOTES: Lote[] = [
  {
    id: "lote-01",
    nombre: "Geisha Honey Finca El Paraíso",
    productorId: "u-vendedor-01",
    productorNombre: "Don Hernando Gómez",
    fincaNombre: "Finca El Paraíso",
    origen: "Huila, Colombia",
    municipio: "Pitalito",
    departamento: "Huila",
    altitudMsnm: 1850,
    variedad: "Geisha",
    procesoBeneficio: "Honey",
    puntajeCatacion: 90.5,
    perfilSensorial: {
      aroma: 9.5,
      acidez: 9.0,
      cuerpo: 8.5,
      dulzor: 9.5,
      balance: 9.0
    },
    notasSensoriales: ["Jazmín", "Melocotón maduro", "Flor de azahar", "Miel de abeja"],
    descripcion: "Microlote exclusivo cultivado a 1.850 metros bajo sombra controlada. Secado lento en camas africanas durante 28 días preservando la pulpa dulce.",
    historiaFinca: "Don Hernando lleva más de 35 años seleccionando árboles madre en el macizo colombiano. Su finca ha ganado reconocimientos en Taza de la Excelencia gracias a su cuidadoso manejo del agua y conservación de fauna nativa.",
    fechaCosecha: "Enero 2026",
    certificaciones: ["Rainforest Alliance", "Origen Denominación Huila"],
    imagenPrincipal: COFFEE_IMAGES.geisha,
    galeriaImagenes: [COFFEE_IMAGES.geisha, COFFEE_IMAGES.plantation, COFFEE_IMAGES.harvest]
  },
  {
    id: "lote-02",
    nombre: "Bourbon Rosado Anaeróbico La Esperanza",
    productorId: "u-vendedor-02",
    productorNombre: "María Eugenia Botero",
    fincaNombre: "Finca La Esperanza",
    origen: "Quindío, Colombia",
    municipio: "Génova",
    departamento: "Quindío",
    altitudMsnm: 1720,
    variedad: "Bourbon Rosado",
    procesoBeneficio: "Anaeróbico",
    puntajeCatacion: 89.2,
    perfilSensorial: {
      aroma: 9.0,
      acidez: 8.8,
      cuerpo: 8.5,
      dulzor: 9.2,
      balance: 8.9
    },
    notasSensoriales: ["Mora silvestre", "Cacao al 70%", "Panela orgánica", "Frambuesa"],
    descripcion: "Fermentación anaeróbica en tanques herméticos de acero inoxidable durante 72 horas con recirculación de lixiviados naturales.",
    historiaFinca: "La Esperanza es un proyecto familiar de tercera generación en las altas montañas del Quindío, pioneros en fermentaciones con inoculación de levaduras autóctonas.",
    fechaCosecha: "Febrero 2026",
    certificaciones: ["Amigo de las Aves", "Fair Trade"],
    imagenPrincipal: COFFEE_IMAGES.bourbon,
    galeriaImagenes: [COFFEE_IMAGES.bourbon, COFFEE_IMAGES.cupping, COFFEE_IMAGES.roast]
  },
  {
    id: "lote-03",
    nombre: "Castillo Reserva Finca San Alberto",
    productorId: "u-vendedor-03",
    productorNombre: "Felipe Villalba",
    fincaNombre: "Hacienda San Alberto",
    origen: "Quindío, Colombia",
    municipio: "Buenavista",
    departamento: "Quindío",
    altitudMsnm: 1650,
    variedad: "Castillo",
    procesoBeneficio: "Lavado",
    puntajeCatacion: 87.5,
    perfilSensorial: {
      aroma: 8.5,
      acidez: 8.5,
      cuerpo: 9.0,
      dulzor: 8.8,
      balance: 8.6
    },
    notasSensoriales: ["Caramelo tostado", "Chocolate con leche", "Naranja dulce", "Almendra"],
    descripcion: "Clásico perfil balanceado de café suave colombiano, con beneficio húmedo ecológico tradicional y lavado con agua de manantial.",
    historiaFinca: "Ubicada en una cumbre privilegiada con vista panorámica a los cañones del Quindío, Hacienda San Alberto es sinónimo de elegancia y consistencia en taza.",
    fechaCosecha: "Diciembre 2025",
    certificaciones: ["UTZ Certified", "Café de Colombia"],
    imagenPrincipal: COFFEE_IMAGES.castillo,
    galeriaImagenes: [COFFEE_IMAGES.castillo, COFFEE_IMAGES.plantation]
  },
  {
    id: "lote-04",
    nombre: "Caturra Chiroso Finca Bella Vista",
    productorId: "u-vendedor-04",
    productorNombre: "Albeiro Cárdenas",
    fincaNombre: "Finca Bella Vista",
    origen: "Risaralda, Colombia",
    municipio: "Santa Rosa de Cabal",
    departamento: "Risaralda",
    altitudMsnm: 1920,
    variedad: "Caturra Chiroso",
    procesoBeneficio: "Doble Fermentación",
    puntajeCatacion: 88.8,
    perfilSensorial: {
      aroma: 9.0,
      acidez: 9.2,
      cuerpo: 8.2,
      dulzor: 9.0,
      balance: 8.8
    },
    notasSensoriales: ["Frutos rojos", "Miel de caña", "Cardamomo", "Té negro"],
    descripcion: "Variedad exótica redescubierta en las laderas andinas. Su doble fermentación resalta una acidez cítrica brillante y cuerpo sedoso.",
    historiaFinca: "Don Albeiro rescató semillas de Chiroso nativo y las sembró en su parcela más alta junto a fuentes termales naturales.",
    fechaCosecha: "Enero 2026",
    certificaciones: ["Orgánico Certificado"],
    imagenPrincipal: COFFEE_IMAGES.chiroso,
    galeriaImagenes: [COFFEE_IMAGES.chiroso, COFFEE_IMAGES.cupping]
  },
  {
    id: "lote-05",
    nombre: "Wush Wush Carbónico La Cumbre",
    productorId: "u-vendedor-05",
    productorNombre: "Camila Arango",
    fincaNombre: "Finca La Cumbre",
    origen: "Caldas, Colombia",
    municipio: "Chinchiná",
    departamento: "Caldas",
    altitudMsnm: 1980,
    variedad: "Wush Wush",
    procesoBeneficio: "Fermentación Carbónica",
    puntajeCatacion: 91.0,
    perfilSensorial: {
      aroma: 9.8,
      acidez: 9.4,
      cuerpo: 8.8,
      dulzor: 9.6,
      balance: 9.4
    },
    notasSensoriales: ["Uva Isabela", "Lavanda", "Bergamota", "Licor de cereza"],
    descripcion: "Cosecha ultra-restringida de 24 sacos. Maceración carbónica en ambiente presurizado con inyección de CO2 que amplifica sus aromas florales únicos.",
    historiaFinca: "Camila Arango es bióloga y caficultora. Ha transformado la finca tradicional de sus abuelos en un laboratorio vivo de agroecología y microbiología del café.",
    fechaCosecha: "Febrero 2026",
    certificaciones: ["Carbono Neutro", "Rainforest Alliance"],
    imagenPrincipal: COFFEE_IMAGES.wush,
    galeriaImagenes: [COFFEE_IMAGES.wush, COFFEE_IMAGES.harvest, COFFEE_IMAGES.roast]
  },
  {
    id: "lote-06",
    nombre: "Maragogype Volcánico Cerro Bravo",
    productorId: "u-vendedor-06",
    productorNombre: "Gonzalo Quintero",
    fincaNombre: "Finca Cerro Bravo",
    origen: "Nariño, Colombia",
    municipio: "La Unión",
    departamento: "Nariño",
    altitudMsnm: 2100,
    variedad: "Maragogype",
    procesoBeneficio: "Lavado",
    puntajeCatacion: 88.0,
    perfilSensorial: {
      aroma: 8.7,
      acidez: 8.9,
      cuerpo: 8.6,
      dulzor: 8.8,
      balance: 8.7
    },
    notasSensoriales: ["Ciruela pasa", "Mandarina dulce", "Panela derretida", "Vainilla"],
    descripcion: "El gigante grano de elefante cultivado a más de 2.100 metros en ricos suelos volcánicos con alta amplitud térmica.",
    historiaFinca: "Cultivado en laderas de gran inclinación por la cooperativa local de La Unión, este café representa la resiliencia del caficultor del sur de Colombia.",
    fechaCosecha: "Enero 2026",
    certificaciones: ["Denominación Nariño", "Café Femenino"],
    imagenPrincipal: COFFEE_IMAGES.maragogype,
    galeriaImagenes: [COFFEE_IMAGES.maragogype, COFFEE_IMAGES.plantation]
  }
];

export const MOCK_PRODUCTOS: Producto[] = [
  {
    id: "prod-01",
    lote: MOCK_LOTES[0],
    precio: 65000,
    pesoGramos: 340,
    stock: 45,
    etiquetas: ["Especialidad", "Microlote", "Más vendido"],
    disponible: true,
    calificacionPromedio: 4.9,
    totalResenas: 38
  },
  {
    id: "prod-02",
    lote: MOCK_LOTES[1],
    precio: 58000,
    pesoGramos: 340,
    stock: 28,
    etiquetas: ["Especialidad", "Nuevo"],
    disponible: true,
    calificacionPromedio: 4.8,
    totalResenas: 24
  },
  {
    id: "prod-03",
    lote: MOCK_LOTES[2],
    precio: 42000,
    pesoGramos: 340,
    stock: 120,
    etiquetas: ["Más vendido"],
    disponible: true,
    calificacionPromedio: 4.7,
    totalResenas: 89
  },
  {
    id: "prod-04",
    lote: MOCK_LOTES[3],
    precio: 52000,
    pesoGramos: 340,
    stock: 35,
    etiquetas: ["Microlote", "Nuevo"],
    disponible: true,
    calificacionPromedio: 4.8,
    totalResenas: 19
  },
  {
    id: "prod-05",
    lote: MOCK_LOTES[4],
    precio: 85000,
    pesoGramos: 250,
    stock: 12,
    etiquetas: ["Edición Limitada", "Microlote"],
    disponible: true,
    calificacionPromedio: 5.0,
    totalResenas: 15
  },
  {
    id: "prod-06",
    lote: MOCK_LOTES[5],
    precio: 49000,
    pesoGramos: 340,
    stock: 50,
    etiquetas: ["Especialidad"],
    disponible: true,
    calificacionPromedio: 4.6,
    totalResenas: 31
  }
];

// Subastas simuladas con tiempo regresivo dinámico
const ahora = Date.now();

export const MOCK_SUBASTAS: Subasta[] = [
  {
    id: "subasta-activa-01",
    loteId: "lote-01",
    lote: MOCK_LOTES[0],
    precioBase: 1200000, // Lote de 30 kg
    precioActual: 1850000,
    incrementoMinimo: 50000,
    liderId: "u-comprador-01",
    liderNombre: "Carlos Mendoza (Tú)",
    fechaInicio: new Date(ahora - 30 * 60 * 1000).toISOString(),
    deadline: new Date(ahora + 240 * 1000).toISOString(), // 4 minutos restantes
    totalPujas: 14,
    estado: "INICIADA",
    streamActivo: true,
    espectadoresConectados: 42
  },
  {
    id: "subasta-activa-02",
    loteId: "lote-05",
    lote: MOCK_LOTES[4],
    precioBase: 2500000, // Lote Wush Wush de concurso
    precioActual: 3200000,
    incrementoMinimo: 100000,
    liderId: "u-buyer-ext-02",
    liderNombre: "Café Roasters Tokyo",
    fechaInicio: new Date(ahora - 15 * 60 * 1000).toISOString(),
    deadline: new Date(ahora + 680 * 1000).toISOString(), // 11 minutos restantes
    totalPujas: 9,
    estado: "INICIADA",
    streamActivo: true,
    espectadoresConectados: 68
  },
  {
    id: "subasta-proxima-01",
    loteId: "lote-02",
    lote: MOCK_LOTES[1],
    precioBase: 1500000,
    precioActual: 1500000,
    incrementoMinimo: 50000,
    liderId: null,
    liderNombre: null,
    fechaInicio: new Date(ahora + 2 * 60 * 60 * 1000).toISOString(), // En 2 horas
    deadline: new Date(ahora + 3 * 60 * 60 * 1000).toISOString(),
    totalPujas: 0,
    estado: "PROGRAMADA",
    streamActivo: false,
    espectadoresConectados: 12
  },
  {
    id: "subasta-cerrada-01",
    loteId: "lote-04",
    lote: MOCK_LOTES[3],
    precioBase: 1100000,
    precioActual: 2150000,
    incrementoMinimo: 50000,
    liderId: "u-buyer-ext-05",
    liderNombre: "Nordic Coffee Lab",
    fechaInicio: new Date(ahora - 5 * 3600 * 1000).toISOString(),
    deadline: new Date(ahora - 3 * 3600 * 1000).toISOString(),
    totalPujas: 22,
    estado: "CERRADA",
    streamActivo: false,
    espectadoresConectados: 0
  }
];

export const MOCK_PEDIDOS: Pedido[] = [
  {
    id: "ped-901",
    codigoOrden: "CO-2026-9012",
    usuarioId: "u-comprador-01",
    items: [
      { producto: MOCK_PRODUCTOS[0], cantidad: 2, subtotal: 130000 },
      { producto: MOCK_PRODUCTOS[2], cantidad: 1, subtotal: 42000 }
    ],
    subtotal: 172000,
    costoEnvio: 12000,
    total: 184000,
    datosEnvio: {
      nombreCompleto: "Carlos Mendoza",
      email: "carlos.mendoza@cafeorbe.com",
      celular: "+57 312 456 7890",
      departamento: "Cundinamarca",
      municipio: "Bogotá D.C.",
      direccion: "Carrera 7 # 115-45, Apto 802",
      codigoPostal: "110111"
    },
    metodoPago: "PSE",
    metodoEnvio: "ESTANDAR_EJE_CAFETERO",
    estado: "ENVIADO",
    fechaCreacion: "2026-09-04T15:30:00Z",
    transportadora: "Coordinadora Mercantil",
    numeroGuia: "COO-789456123-CO"
  }
];
