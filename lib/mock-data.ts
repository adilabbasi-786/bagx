export interface Product {
  id: string
  name: string
  category: 'bags' | 'watches' | 'cosmetics'
  price: number
  originalPrice: number
  discount: number
  image: string
  images: string[]
  description: string
  colors: Array<{ name: string; hex: string }>
  sizes?: string[]
  rating: number
  reviews: number
  reviews_list: Review[]
  featured: boolean
  stock: number
}

export interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
}

// Mock product images - using placeholder URLs
const BAG_IMAGES = [
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1494656671821-46f45e59040e?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1548890240-fc2ee8dfa2d8?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=800&fit=crop',
]

const WATCH_IMAGES = [
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1579859330333-1c925e93cad1?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=800&fit=crop',
]

const COSMETICS_IMAGES = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1633525712527-e58eb061e2a7?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-af3efdc991db?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1631214174292-7ac56d7f7f1e?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1580822261290-991b38693d1b?w=800&h=800&fit=crop',
]

export const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    title: 'Absolutely stunning quality!',
    content: 'The craftsmanship is incredible. I\'ve received so many compliments. Worth every penny!',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    author: 'Fatima A.',
    rating: 5,
    title: 'Perfect everyday bag',
    content: 'Spacious, durable, and so elegantly designed. This is my third purchase from BAGX.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '3',
    author: 'Amelia K.',
    rating: 4,
    title: 'Great but took time to break in',
    content: 'Beautiful bag, quality is top notch. Just needed a bit of time to soften up.',
    date: '2024-01-05',
    verified: true,
  },
]

export const mockProducts: Product[] = [
  // Bags
  {
    id: 'bag-1',
    name: 'Women Boxy Bag - YELLOW',
    category: 'bags',
    price: 3120,
    originalPrice: 7800,
    discount: 60,
    image: BAG_IMAGES[0],
    images: [BAG_IMAGES[0], BAG_IMAGES[1], BAG_IMAGES[2]],
    description:
      'Carry your daily essentials in style with our WB2685-GREEN Women Bag! Designed specifically for women, this bag is both fashionable and functional. With enough space for all your belongings, our bag is the perfect accessory to elevate any outfit. Make a statement while staying organized with our Women Bag!',
    colors: [
      { name: 'Yellow', hex: '#FFDD00' },
      { name: 'Black', hex: '#000000' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
    sizes: ['One Size'],
    rating: 4.8,
    reviews: 124,
    reviews_list: mockReviews,
    featured: true,
    stock: 15,
  },
  {
    id: 'bag-2',
    name: 'Elegant Tote - BLACK',
    category: 'bags',
    price: 4500,
    originalPrice: 9000,
    discount: 50,
    image: BAG_IMAGES[1],
    images: [BAG_IMAGES[1], BAG_IMAGES[2], BAG_IMAGES[3]],
    description: 'Classic black tote bag perfect for work and travel. Premium leather construction.',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Navy', hex: '#000080' },
    ],
    sizes: ['Small', 'Medium', 'Large'],
    rating: 4.7,
    reviews: 98,
    reviews_list: mockReviews,
    featured: true,
    stock: 20,
  },
  {
    id: 'bag-3',
    name: 'Crossbody Shoulder Bag - RED',
    category: 'bags',
    price: 2800,
    originalPrice: 6200,
    discount: 55,
    image: BAG_IMAGES[2],
    images: [BAG_IMAGES[2], BAG_IMAGES[3], BAG_IMAGES[4]],
    description: 'Versatile crossbody bag with adjustable strap. Perfect for daily use.',
    colors: [
      { name: 'Red', hex: '#FF0000' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Pink', hex: '#FFC0CB' },
    ],
    rating: 4.6,
    reviews: 76,
    reviews_list: mockReviews,
    featured: true,
    stock: 18,
  },
  {
    id: 'bag-4',
    name: 'Leather Clutch - GOLD',
    category: 'bags',
    price: 2200,
    originalPrice: 5000,
    discount: 56,
    image: BAG_IMAGES[3],
    images: [BAG_IMAGES[3], BAG_IMAGES[4], BAG_IMAGES[0]],
    description: 'Glamorous leather clutch for evening occasions.',
    colors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Rose Gold', hex: '#B76E79' },
    ],
    rating: 4.9,
    reviews: 142,
    reviews_list: mockReviews,
    featured: true,
    stock: 12,
  },
  // Watches
  {
    id: 'watch-1',
    name: 'Luxury Classic - ROSE GOLD',
    category: 'watches',
    price: 15999,
    originalPrice: 32000,
    discount: 50,
    image: WATCH_IMAGES[0],
    images: [WATCH_IMAGES[0], WATCH_IMAGES[1], WATCH_IMAGES[2]],
    description: 'Timeless elegance meets modern design. Premium Swiss quartz movement.',
    colors: [
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    sizes: ['32mm', '36mm', '40mm'],
    rating: 4.9,
    reviews: 267,
    reviews_list: mockReviews,
    featured: true,
    stock: 25,
  },
  {
    id: 'watch-2',
    name: 'Sporty Digital - BLACK',
    category: 'watches',
    price: 8999,
    originalPrice: 18000,
    discount: 50,
    image: WATCH_IMAGES[1],
    images: [WATCH_IMAGES[1], WATCH_IMAGES[2], WATCH_IMAGES[3]],
    description: 'High-performance sports watch with advanced features.',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' },
    ],
    rating: 4.7,
    reviews: 189,
    reviews_list: mockReviews,
    featured: true,
    stock: 30,
  },
  {
    id: 'watch-3',
    name: 'Elegant Dial - CHAMPAGNE',
    category: 'watches',
    price: 12500,
    originalPrice: 25000,
    discount: 50,
    image: WATCH_IMAGES[2],
    images: [WATCH_IMAGES[2], WATCH_IMAGES[3], WATCH_IMAGES[4]],
    description: 'Sophisticated champagne dial with diamond markers.',
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Gold', hex: '#FFD700' },
    ],
    rating: 4.8,
    reviews: 156,
    reviews_list: mockReviews,
    featured: true,
    stock: 20,
  },
  // Cosmetics
  {
    id: 'cosmetic-1',
    name: 'Signature Red Lipstick',
    category: 'cosmetics',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    image: COSMETICS_IMAGES[0],
    images: [COSMETICS_IMAGES[0], COSMETICS_IMAGES[1], COSMETICS_IMAGES[2]],
    description: 'Iconic deep red lipstick with matte finish. Long-lasting formula.',
    colors: [
      { name: 'Red', hex: '#FF0000' },
      { name: 'Berry', hex: '#991143' },
      { name: 'Nude', hex: '#E5A89B' },
    ],
    rating: 4.8,
    reviews: 312,
    reviews_list: mockReviews,
    featured: true,
    stock: 50,
  },
  {
    id: 'cosmetic-2',
    name: 'Luxury Face Foundation',
    category: 'cosmetics',
    price: 3299,
    originalPrice: 6599,
    discount: 50,
    image: COSMETICS_IMAGES[1],
    images: [COSMETICS_IMAGES[1], COSMETICS_IMAGES[2], COSMETICS_IMAGES[3]],
    description: 'Full coverage foundation with natural finish. SPF 30 protection.',
    colors: [
      { name: 'Fair', hex: '#F8DCC8' },
      { name: 'Medium', hex: '#D4A574' },
      { name: 'Deep', hex: '#8B6F47' },
    ],
    rating: 4.6,
    reviews: 228,
    reviews_list: mockReviews,
    featured: true,
    stock: 40,
  },
  {
    id: 'cosmetic-3',
    name: 'Eyeshadow Palette - SUNSET',
    category: 'cosmetics',
    price: 2199,
    originalPrice: 4399,
    discount: 50,
    image: COSMETICS_IMAGES[2],
    images: [COSMETICS_IMAGES[2], COSMETICS_IMAGES[3], COSMETICS_IMAGES[4]],
    description: '12-shade eyeshadow palette with warm sunset tones.',
    colors: [
      { name: 'Sunset', hex: '#E89B3C' },
      { name: 'Ocean', hex: '#4A90E2' },
      { name: 'Forest', hex: '#2D5016' },
    ],
    rating: 4.9,
    reviews: 401,
    reviews_list: mockReviews,
    featured: true,
    stock: 35,
  },
]
