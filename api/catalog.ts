/**
 * Catálogo de productos y precios definidos en el servidor.
 * Los precios NO provienen del navegador: se resuelven aquí por ID de producto.
 * Los IDs coinciden con los utilizados en lib/artifacts/cafes-de-carla/src/data/menu.ts.
 *
 * Para modo producción, reemplaza unit_amount por Price IDs de Stripe
 * (price: 'price_...') si prefieres usar precios gestionados en Stripe Dashboard.
 */

export type CatalogItem = {
  name: string;
  priceCents: number;
  currency: 'eur';
  description?: string;
};

// Catálogo crudo SIN currency (para no repetirlo en cada producto)
// y luego se le añade currency: 'eur' por abajo.
type RawCatalogItem = Omit<CatalogItem, 'currency'>;

export const rawCATALOG: RawCatalogItem[] = [
  // --- Cafés clásicos (solo los que tienen precio indicado en la carta) ---
  { name: 'Café Carla', priceCents: 0, description: 'Baileys o Tía María.' },
  // Sin precio definido en la carta -> no vendible por checkout hasta que se asigne precio.

  // --- Bocadillos ---
  { name: 'Moni', priceCents: 220, description: 'Pollo al curry, aguacate, queso tierno, pavo y tomate.' },
  { name: 'Esther', priceCents: 220, description: 'Pata, cebolla crujiente, queso tierno y salsa sueca.' },
  { name: 'Fiona', priceCents: 220, description: 'Serrano, majorero a la plancha, tomate y aguacate.' },
  { name: 'Carol', priceCents: 220, description: 'Pavo, aguacate, tortilla francesa y queso majorero.' },
  { name: 'Carla', priceCents: 220, description: 'Masa de pollo, aguacate y queso.' },
  { name: 'Rebeca', priceCents: 210, description: 'Pollo, pimiento verde, cebolla y salsa sueca.' },
  { name: 'Jamón serrano y queso tierno', priceCents: 200 },
  { name: 'Jamón serrano catalana', priceCents: 200 },
  { name: 'Jamón ibérico y queso tierno', priceCents: 300 },
  { name: 'Jamón ibérico catalana', priceCents: 295 },
  { name: 'Tortilla y pimientos verdes', priceCents: 220 },
  { name: 'Pollo al curry', priceCents: 220, description: 'Mayonesa, lechuga y tomate.' },
  { name: 'Carne mechada', priceCents: 220, description: 'Queso gouda y salsa sueca.' },
  { name: 'Lomo especial', priceCents: 220, description: 'Lomo adobado, lechuga, tomate y zanahoria.' },
  { name: 'Pata y tomate', priceCents: 220 },

  // --- Sandwiches ---
  { name: 'Calabacín, queso gouda, huevo y salsa sueca', priceCents: 150 },
  { name: 'Cangrejos, berros y zanahoria', priceCents: 125 },
  { name: 'Pollo y huevo', priceCents: 135 },
  { name: 'Pollo, huevo y queso gouda', priceCents: 150 },
  { name: 'Atún, huevo y queso gouda', priceCents: 150 },
  { name: 'Atún, huevo y aguacate', priceCents: 150 },
  { name: 'Atún y millo', priceCents: 125 },
  { name: 'Atún y pimiento', priceCents: 125 },
  { name: 'Cangrejo', priceCents: 125 },
  { name: 'Berros y queso tierno', priceCents: 150 },
  { name: 'Jamón y queso', priceCents: 250 },
  { name: 'Vegetal', priceCents: 300 },
  { name: 'Calabacín y queso tierno', priceCents: 150 },
  { name: 'Especiales', priceCents: 350 },

  // --- Croissants ---
  { name: 'Vegetal', priceCents: 200 },
  { name: 'Jamón y queso', priceCents: 300 },
  { name: 'Atún y millo', priceCents: 300 },
  { name: 'Tortilla', priceCents: 300 },
  { name: 'Especiales', priceCents: 450 },

  // --- Dulces ---
  { name: 'Tartas variadas', priceCents: 400 },
  { name: 'Queque casero', priceCents: 250 },
  { name: 'Cookies con chocolate', priceCents: 220 },

  // --- Crepes salados ---
  { name: 'Mixto', priceCents: 520, description: 'Jamón y queso.' },
  { name: 'Crep pizza', priceCents: 520, description: 'Mozzarella, atún, salsa de tomate, orégano y albahaca.' },

  // --- Crepes dulces ---
  { name: 'Crep de crema de cacahuete y chocolate', priceCents: 520 },
  { name: 'Crep de caramelo', priceCents: 520 },
  { name: 'Crep de dulce de leche', priceCents: 520 },
  { name: 'Crep Chocomix', priceCents: 520, description: 'Chocolate y chocolate blanco.' },
  { name: 'Crep Oreo', priceCents: 520, description: 'Chocolate blanco y galletas Oreo.' },
  { name: 'Crep Lotus', priceCents: 520, description: 'Crema de Lotus y galletas Lotus.' },

  // --- Cereales y boles ---
  { name: 'Cereales', priceCents: 300, description: 'Tamaños S, M y L. Leche entera, desnatada, sin lactosa, avena, soja o almendra.' },

  // --- Gofres y tortitas ---
  { name: 'Gofres', priceCents: 390, description: 'Elige topping: caramelo, chocolate, crema de cacahuete, chocolate blanco, crema Lotus, mermelada o galletas Lotus.' },
  { name: 'Tortitas', priceCents: 290 },

  // --- Extras ---
  { name: 'Extras', priceCents: 100, description: 'Lomo, pata, pollo, serrano, atún, queso majorero, queso tierno, ibérico, entre otros.' },
  { name: 'Suplementos', priceCents: 50, description: 'Jamón, queso, entre otros.' },
  { name: 'Suplemento de bola de helado', priceCents: 100 },
];

// Catálogo final: se le añade currency: 'eur' a cada producto.
// Así no repetimos la propiedad en cada objeto y TypeScript lo valida todo.
export const CATALOG: CatalogItem[] = rawCATALOG.map((item) => ({
  ...item,
  currency: 'eur',
}));

export function getCatalogItem(itemId: string): CatalogItem | undefined {
  return CATALOG[itemId];
}

export function isSellable(itemId: string): boolean {
  const item = CATALOG[itemId];
  return Boolean(item && item.priceCents > 0);
}