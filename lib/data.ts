export interface Product {
    id: string
    title: string
    slug: string
    price: number
    originalPrice?: number
    image: string
    category: string
    rating: number
    reviews: number
    inStock: boolean
    isNew?: boolean
    isBestSeller?: boolean
}

export const CATEGORIES = [
    { id: '1', name: 'Fruits & Veg', icon: '🍎' },
    { id: '2', name: 'Meat & Fish', icon: '🥩' },
    { id: '3', name: 'Beverages', icon: '🥤' },
    { id: '4', name: 'Snacks', icon: '🍪' },
    { id: '5', name: 'Dairy', icon: '🥛' },
    { id: '6', name: 'Personal Care', icon: '🧴' },
]

export const PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Fresh Organic Apples',
        slug: 'fresh-organic-apples',
        price: 250,
        originalPrice: 300,
        image: '/placeholder-apple.png',
        category: 'Fruits & Veg',
        rating: 4.8,
        reviews: 120,
        inStock: true,
        isNew: true,
    },
    {
        id: '2',
        title: 'Premium Beef Cuts (1kg)',
        slug: 'premium-beef-cuts-1kg',
        price: 850,
        image: '/placeholder-beef.png',
        category: 'Meat & Fish',
        rating: 4.9,
        reviews: 85,
        inStock: true,
        isBestSeller: true,
    },
    {
        id: '3',
        title: 'Soybean Oil (5L)',
        slug: 'soybean-oil-5l',
        price: 900,
        originalPrice: 950,
        image: '/placeholder-oil.png',
        category: 'Grocery',
        rating: 4.5,
        reviews: 300,
        inStock: true,
        isBestSeller: true,
    },
    {
        id: '4',
        title: 'Mila Skimmed Milk',
        slug: 'mila-skimmed-milk',
        price: 90,
        image: '/placeholder-milk.png',
        category: 'Dairy',
        rating: 4.6,
        reviews: 45,
        inStock: true,
    },
    {
        id: '5',
        title: 'Pringles Original',
        slug: 'pringles-original',
        price: 220,
        image: '/placeholder-chips.png',
        category: 'Snacks',
        rating: 4.7,
        reviews: 200,
        inStock: true,
    },
    {
        id: '6',
        title: 'Dove Moisture Shampoo',
        slug: 'dove-moisture-shampoo',
        price: 450,
        image: '/placeholder-shampoo.png',
        category: 'Personal Care',
        rating: 4.8,
        reviews: 150,
        inStock: true,
    },
]
