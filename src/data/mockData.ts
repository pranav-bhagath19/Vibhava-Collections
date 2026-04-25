
export interface Product {
  id: string;
  name: string;
  category: 'Silk Sarees' | 'Cotton Sarees' | 'Designer Sarees' | 'Dress Materials';
  price: number;
  discountPrice?: number;
  fabric: string;
  occasion: 'Wedding' | 'Casual' | 'Festive' | 'Party';
  color: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  trending?: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 's-1',
    name: 'Royal Maroon Kanchipuram Silk',
    category: 'Silk Sarees',
    price: 18500,
    discountPrice: 15999,
    fabric: 'Pure Silk',
    occasion: 'Wedding',
    color: 'Maroon',
    description: 'A masterpiece of traditional weaving, this Kanchipuram silk saree features intricate gold zari work across the border and pallu. Perfect for weddings and grand occasions.',
    images: ['/assets/images/vibhava_hero_saree.png'],
    rating: 4.9,
    reviews: 86,
    trending: true,
    featured: true
  },
  {
    id: 's-2',
    name: 'Midnight Blue Banarasi Silk',
    category: 'Silk Sarees',
    price: 12000,
    discountPrice: 9500,
    fabric: 'Banarasi Silk',
    occasion: 'Festive',
    color: 'Blue',
    description: 'Classic Banarasi silk with floral motifs in silver zari. The rich texture and elegant drape make it a festive favorite.',
    images: ['/assets/images/designer-saree.png'],
    rating: 4.7,
    reviews: 42,
    trending: true
  },
  {
    id: 'c-1',
    name: 'Handblock Printed Ajrakh Cotton',
    category: 'Cotton Sarees',
    price: 3500,
    discountPrice: 2800,
    fabric: 'Pure Cotton',
    occasion: 'Casual',
    color: 'Indigo',
    description: 'Breathable pure cotton saree with authentic Ajrakh handblock prints using natural dyes.',
    images: ['/assets/images/cotton-saree.png'],
    rating: 4.8,
    reviews: 112,
    featured: true
  },
  {
    id: 'd-1',
    name: 'Emerald Green Anarkali Suit Set',
    category: 'Dress Materials',
    price: 5500,
    discountPrice: 4200,
    fabric: 'Chanderi Silk',
    occasion: 'Festive',
    color: 'Green',
    description: 'Unstitched dress material with heavy embroidery on the neck and border. Includes silk dupatta.',
    images: ['/assets/images/dress-material.png'],
    rating: 4.6,
    reviews: 28,
    trending: true
  },
  {
    id: 's-3',
    name: 'Pastel Pink Organza Saree',
    category: 'Designer Sarees',
    price: 8500,
    discountPrice: 6999,
    fabric: 'Organza',
    occasion: 'Party',
    color: 'Pink',
    description: 'Lightweight organza saree with delicate floral embroidery and scalloped borders.',
    images: ['/assets/images/designer-saree.png'],
    rating: 4.9,
    reviews: 55,
    featured: true
  },
  {
    id: 's-4',
    name: 'Golden Yellow Tussar Silk',
    category: 'Silk Sarees',
    price: 9500,
    discountPrice: 7999,
    fabric: 'Tussar Silk',
    occasion: 'Festive',
    color: 'Yellow',
    description: 'Rich Tussar silk in a vibrant golden yellow hue, featuring traditional tribal-inspired borders.',
    images: ['/assets/images/vibhava_hero_saree.png'],
    rating: 4.5,
    reviews: 34
  }
];

export const categories = [
  { name: 'Silk Sarees', slug: 'silk-sarees', image: '/assets/images/vibhava_hero_saree.png' },
  { name: 'Cotton Sarees', slug: 'cotton-sarees', image: '/assets/images/cotton-saree.png' },
  { name: 'Designer Sarees', slug: 'designer-sarees', image: '/assets/images/designer-saree.png' },
  { name: 'Dress Materials', slug: 'dress-materials', image: '/assets/images/dress-material.png' }
];
