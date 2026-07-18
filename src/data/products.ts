import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'gold-foil-roll',
    name: 'Royal Gold Chocolate Foil Roll',
    description: 'Luxurious food-grade double-sided gold aluminium foil rolls, specifically manufactured to wrap premium artisanal chocolates. Delivers a flawless finish and excellent dead-fold characteristics.',
    details: 'Our flagship product. Engineered for high-speed mechanical wrapping as well as artisanal hand-wrapping. The high dead-fold of our foil ensures that it clings tight to every contour of your chocolate, preserving freshness and offering that premium weighted crunch upon opening.',
    price: 89.00,
    rating: 4.9,
    reviewsCount: 124,
    image: '/gold_foil.png',
    images: [
      '/gold_foil.png',
      '/silver_foil.png',
      '/silver_foil.png',
      '/printed_foil.png'
    ],
    images360: [
      '/gold_foil.png',
      '/silver_foil.png',
      '/silver_foil.png',
      '/printed_foil.png',
      '/gold_foil.png',
      '/silver_foil.png',
      '/silver_foil.png',
      '/printed_foil.png'
    ],
    category: 'Gold Foils',
    colors: [
      { name: 'Classic Gold', hex: '#D4AF37' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Champagne Gold', hex: '#F3E5AB' }
    ],
    sizes: [
      { name: 'Boutique Roll (50m)', dimensions: '50m x 300mm x 12µm', priceModifier: 0 },
      { name: 'Confectioner Roll (100m)', dimensions: '100m x 300mm x 12µm', priceModifier: 60 },
      { name: 'Factory Master (200m)', dimensions: '200m x 300mm x 12µm', priceModifier: 130 }
    ],
    specifications: {
      'Material': '99.5% Pure Food-Grade Aluminium',
      'Thickness': '12 Micron (µm) Premium Standard',
      'Temper': 'Soft O (Fully Annealed for high dead-fold)',
      'Tensile Strength': '65-95 MPa',
      'Elongation': '≥ 5%',
      'Lining': 'Unlined, raw double-sided metallic shine'
    },
    stock: 45,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-1',
        user: 'Valerie Dupont (Maison du Chocolat)',
        rating: 5,
        date: '2026-05-12',
        title: 'Absolutely Stunning Sheen',
        comment: 'This gold foil elevated our holiday truffle collection. The dead-fold is perfect; it wraps cleanly around spherical shapes without crinkling or tearing. Our customers noticed the difference immediately.',
        helpfulCount: 24
      },
      {
        id: 'rev-2',
        user: 'Marcus Sterling (Sterling Chocolates)',
        rating: 5,
        date: '2026-06-01',
        title: 'Highly Recommended for Production Lines',
        comment: 'We run high-speed wrapping machinery and these rolls hold up perfectly. Very low tear rates. The color consistency across batches is excellent.',
        helpfulCount: 15
      }
    ],
    tags: ['Gold', 'Roll', 'Premium']
  },
  {
    id: 'silver-wrapping-foil',
    name: 'Imperial Silver Wrapping Foil',
    description: 'Elegant and sterile silver chocolate wrapping foil with high tear resistance, providing moisture protection and high shine.',
    details: 'A classic, clean aesthetic designed to highlight dark, single-origin chocolate bars. Crafted from ultra-pure aluminium, it provides a flawless vapor barrier to protect and preserve organic cocoa aromas.',
    price: 79.00,
    rating: 4.8,
    reviewsCount: 86,
    image: '/silver_foil.png',
    images: [
      '/silver_foil.png',
      '/gold_foil.png'
    ],
    category: 'Silver Foils',
    colors: [
      { name: 'Platinum Silver', hex: '#E5E4E2' },
      { name: 'Matte Silver', hex: '#C0C0C0' }
    ],
    sizes: [
      { name: 'Boutique Roll (50m)', dimensions: '50m x 300mm x 11µm', priceModifier: 0 },
      { name: 'Confectioner Roll (100m)', dimensions: '100m x 300mm x 11µm', priceModifier: 50 },
      { name: 'Factory Master (200m)', dimensions: '200m x 300mm x 11µm', priceModifier: 110 }
    ],
    specifications: {
      'Material': 'Food-Grade Aluminium Alloy 8011',
      'Thickness': '11 Micron (µm) Ultra-Thin',
      'Temper': 'Soft O',
      'Finish': 'One side bright, one side matte',
      'Core': '76mm paper core'
    },
    stock: 60,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-3',
        user: 'Stefan K. (Bavarian Pralines)',
        rating: 5,
        date: '2026-04-18',
        title: 'Perfect Protection',
        comment: 'Keeps our chocolates fresh for months. Excellent barrier properties against humidity. We order these in bulk monthly.',
        helpfulCount: 8
      }
    ],
    tags: ['Silver', 'Roll', 'Classic']
  },
  {
    id: 'ruby-red-wrappers',
    name: 'Ruby Red Candy Wrappers (500 Pack)',
    description: 'Perfectly pre-cut colored aluminium foil sheets with a premium paper backing. Ideal for hand-wrapping small truffles, pralines, and caramels.',
    details: 'These pre-cut squares save immense time in artisanal shops. Features a paper-backed lining that adds structural stiffness, making hand twists quick and neat without any tearing.',
    price: 34.00,
    rating: 4.7,
    reviewsCount: 92,
    image: '/candy_wrappers.png',
    images: [
      '/candy_wrappers.png',
      '/candy_wrappers.png'
    ],
    category: 'Candy Wrappers',
    colors: [
      { name: 'Ruby Red', hex: '#9B111E' },
      { name: 'Emerald Green', hex: '#046307' },
      { name: 'Royal Blue', hex: '#002366' }
    ],
    sizes: [
      { name: 'Standard (10x10 cm)', dimensions: '100mm x 100mm, 500 sheets', priceModifier: 0 },
      { name: 'Large (15x15 cm)', dimensions: '150mm x 150mm, 500 sheets', priceModifier: 12 }
    ],
    specifications: {
      'Material': 'Aluminium Foil laminated to thin Food Paper',
      'Total Thickness': '38 gsm premium composite',
      'Cut Precision': '± 0.5mm',
      'Print Ink': '100% Non-Toxic Soy-based'
    },
    stock: 120,
    isNewArrival: true,
    reviews: [
      {
        id: 'rev-4',
        user: 'Elena Rostova (Moscow Sweet Craft)',
        rating: 4,
        date: '2026-06-11',
        title: 'Vibrant Colors, Easy to Handle',
        comment: 'The paper backing makes wrapping a breeze. The twist holds tightly at the top. I only wish the emerald green was a bit brighter.',
        helpfulCount: 5
      }
    ],
    tags: ['Pre-cut', 'Color', 'Paper-Backed']
  },
  {
    id: 'embossed-gold-foil',
    name: 'Vanguard Embossed Chocolate Foil',
    description: 'Foil featuring a delicate custom-textured pattern (diamond design) that sparkles under boutique lighting. Enhances the luxury feel of gourmet tablets.',
    details: 'Uniquely micro-embossed with a fine micro-grid pattern that scatters light beautifully. This gives a highly tactile, luxury hand-feel to chocolate bars that screams hand-crafted excellence.',
    price: 95.00,
    rating: 4.9,
    reviewsCount: 42,
    image: '/silver_foil.png',
    images: [
      '/silver_foil.png',
      '/printed_foil.png'
    ],
    category: 'Chocolate Foils',
    colors: [
      { name: 'Boutique Gold', hex: '#C5A880' },
      { name: 'Warm Bronze', hex: '#6E473B' },
      { name: 'Rose Copper', hex: '#B87333' }
    ],
    sizes: [
      { name: 'Boutique Roll (50m)', dimensions: '50m x 300mm x 14µm', priceModifier: 0 },
      { name: 'Confectioner Roll (100m)', dimensions: '100m x 300mm x 14µm', priceModifier: 70 }
    ],
    specifications: {
      'Material': 'Embossed Pure Aluminium Foil',
      'Thickness': '14 Micron (µm) Extra-Heavy',
      'Pattern': 'Micro-Diamond Grid',
      'Heat Resistance': 'Up to 220°C',
      'De-folding': 'Zero spring-back'
    },
    stock: 25,
    isNewArrival: true,
    reviews: [
      {
        id: 'rev-5',
        user: 'Francois Gautier (Paris Pâtisserie)',
        rating: 5,
        date: '2026-07-02',
        title: 'Stately and Artistic',
        comment: 'This is the crown jewel of wrapping materials. The diamond pattern catches spotlights on the boutique shelf and looks gorgeous.',
        helpfulCount: 18
      }
    ],
    tags: ['Embossed', 'Textured', 'Roll']
  },
  {
    id: 'printed-foil-sheets',
    name: 'Vintage Printed Foil Sheets (200 Pack)',
    description: 'Foil sheets printed with food-safe organic inks in a regal damask pattern. Perfect for seasonal gift sets and collection launches.',
    details: 'These pre-cut sheets feature a delicate printed damask motif on premium foil. Printed using water-based, solvent-free food-safe pigments that do not rub off or bleed onto the chocolate surface.',
    price: 48.00,
    rating: 4.6,
    reviewsCount: 37,
    image: '/printed_foil.png',
    images: [
      '/printed_foil.png'
    ],
    category: 'Printed Foils',
    colors: [
      { name: 'Gold Damask', hex: '#D4AF37' },
      { name: 'Silver Vine', hex: '#E5E4E2' },
      { name: 'Bronze Stripe', hex: '#8C7853' }
    ],
    sizes: [
      { name: 'Standard (12x12 cm)', dimensions: '120mm x 120mm, 200 sheets', priceModifier: 0 },
      { name: 'Bar Size (20x20 cm)', dimensions: '200mm x 200mm, 200 sheets', priceModifier: 20 }
    ],
    specifications: {
      'Material': 'Printed Food-grade Foil with protective slip coating',
      'Thickness': '13 Micron (µm)',
      'Ink Type': 'Water-based, Odorless, Food-Contact Compliant',
      'Origin': 'Made in Italy'
    },
    stock: 35,
    isNewArrival: false,
    reviews: [
      {
        id: 'rev-6',
        user: 'Camille L. (Geneva Confectionery)',
        rating: 5,
        date: '2026-05-30',
        title: 'Incredibly Elegant Designs',
        comment: 'We used the Gold Damask sheets for our signature hazelnut bars. The aesthetic is high-end, and the print quality is very sharp.',
        helpfulCount: 7
      }
    ],
    tags: ['Printed', 'Damask', 'Pre-cut']
  },
  {
    id: 'color-assortment-pack',
    name: 'Classic Color Aluminium Foil Set',
    description: 'Vibrant and shimmering assortment of primary and secondary colored foil wrappers, perfect for sorting different chocolate formulas.',
    details: 'An ideal start for medium-scale operations. Pack contains equal splits of multiple vivid colors, offering a high-sheen coating to denote various chocolate flavors (e.g. Milk, Dark, Caramel, Mint).',
    price: 65.00,
    rating: 4.8,
    reviewsCount: 153,
    image: '/color_assortment.png',
    images: [
      '/color_assortment.png',
      '/candy_wrappers.png'
    ],
    category: 'Color Foils',
    colors: [
      { name: 'Shimmer Blue', hex: '#0F52BA' },
      { name: 'Emerald Green', hex: '#50C878' },
      { name: 'Royal Purple', hex: '#6A0DAD' },
      { name: 'Vibrant Pink', hex: '#FF007F' }
    ],
    sizes: [
      { name: '100 Sheets Pack', dimensions: '12x12 cm, 25 sheets per color', priceModifier: -20 },
      { name: '250 Sheets Pack', dimensions: '12x12 cm, 62 sheets per color', priceModifier: 0 },
      { name: '500 Sheets Pack', dimensions: '12x12 cm, 125 sheets per color', priceModifier: 30 }
    ],
    specifications: {
      'Material': 'High-tensile Food Aluminium Foil',
      'Thickness': '12 Micron (µm)',
      'Colors': 'Blue, Green, Purple, Pink (Assorted)',
      'Coating': 'Anti-oxidation protective surface lacquer'
    },
    stock: 80,
    isSale: true,
    discountPrice: 52.00,
    reviews: [
      {
        id: 'rev-7',
        user: 'Tobias Forge (Whip Confectionery)',
        rating: 4,
        date: '2026-06-25',
        title: 'Great Color Assortment',
        comment: 'Bright colors, and they wrap without fading or breaking down. It makes color-coding our line of sea salt and fruit-infused caramels very simple.',
        helpfulCount: 4
      }
    ],
    tags: ['Assorted', 'Color', 'Pack']
  },
  {
    id: 'premium-chocolate-box',
    name: 'Bespoke Chocolate Box (16-Piece)',
    description: 'Sturdy and elegant cardboard box featuring a gold foil inlay and custom divider grid, offering premium protection for delicate filled chocolates.',
    details: 'Constructed from heavy-duty 400gsm rigid paperboard, wrapped in luxury embossed textured linen. It includes an eco-friendly PET food-grade divider insert and a metallic gold paper border inside for a stunning unboxing presentation.',
    price: 12.00,
    rating: 4.9,
    reviewsCount: 65,
    image: '/chocolate_box.png',
    images: [
      '/chocolate_box.png',
      '/chocolate_box.png'
    ],
    category: 'Chocolate Boxes',
    colors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Rich Cocoa', hex: '#3D2314' },
      { name: 'Imperial Gold', hex: '#C5A880' }
    ],
    sizes: [
      { name: '16-Piece Grid', dimensions: '160mm x 160mm x 35mm', priceModifier: 0 },
      { name: '24-Piece Grid', dimensions: '240mm x 160mm x 35mm', priceModifier: 6 }
    ],
    specifications: {
      'Material': '400gsm Textured Paperboard + PET divider',
      'Lining': 'Gold foil stamped interior',
      'Structure': 'Two-piece rigid lid and base',
      'Compliance': 'FDA approved food-contact material'
    },
    stock: 200,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-8',
        user: 'Lucia Alvarez (Alvarez Pralinier)',
        rating: 5,
        date: '2026-07-10',
        title: 'Perfect Luxury Presentation',
        comment: 'These boxes feel extremely rigid and high-end. The matte black linen texture is gorgeous, and the gold stamping inside screams luxury. Will buy by the thousands next season.',
        helpfulCount: 30
      }
    ],
    tags: ['Box', 'Rigid', 'Gift']
  },
  {
    id: 'luxury-gift-wrap',
    name: 'Luxury Gift Wrap Set (Assorted)',
    description: 'A curated collection of heavy-duty textured packaging papers and gold ribbons to complete your corporate and luxury gifting orders.',
    details: 'A set of 5 rolls of wrapping paper crafted from premium FSC-certified sustainable papers with gold-metallic hot stamp patterns. Complete with 3 rolls of double-faced gold satin ribbon.',
    price: 28.00,
    rating: 4.7,
    reviewsCount: 29,
    image: '/chocolate_box.png',
    images: [
      '/chocolate_box.png'
    ],
    category: 'Gift Packaging',
    colors: [
      { name: 'Assorted Pack', hex: '#63513b' }
    ],
    sizes: [
      { name: '5 Rolls Set', dimensions: '5 rolls x 2m x 70cm + 3 ribbons', priceModifier: 0 }
    ],
    specifications: {
      'Paper Weight': '110 gsm heavy-duty textured paper',
      'Hot Stamping': 'Real metallic gold foil stamping',
      'Ribbon Width': '25mm Double-faced satin (10m each)',
      'Sustainability': '100% recyclable, FSC certified'
    },
    stock: 50,
    isSale: true,
    discountPrice: 22.00,
    reviews: [
      {
        id: 'rev-9',
        user: 'Jennifer Lopez (Corporate Sweet Gifts)',
        rating: 5,
        date: '2026-06-05',
        title: 'Substantial Weight and Feel',
        comment: 'Excellent thickness. It does not crease or tear easily at the corners like cheap wrapping papers. The hot stamp elements look spectacular.',
        helpfulCount: 9
      }
    ],
    tags: ['Ribbon', 'Paper', 'Gift']
  }
];
