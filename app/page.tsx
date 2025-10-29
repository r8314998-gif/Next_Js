import { ProductCard } from '@/components/ProductCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ProductGrid } from '@/components/ProductGrid'
import { Product } from '@/lib/types'

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    
    const response = await res.json()
    return response.data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return fallback data
    return [
      {
        id: '1',
        title: 'Premium Wireless Headphones',
        description: 'High-quality noise-canceling headphones with premium sound quality and long-lasting battery life.',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80',
        rating: 4.5,
        category: 'Electronics',
        inStock: true,
        onSale: true,
      },
      {
        id: '2',
        title: 'Smart Fitness Watch',
        description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80',
        rating: 4.2,
        category: 'Wearables',
        inStock: true,
      },
      {
        id: '3',
        title: 'Professional Camera Lens',
        description: 'Capture stunning photos with this professional-grade camera lens designed for photographers.',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&q=80',
        rating: 4.8,
        category: 'Photography',
        inStock: false,
      },
    ]
  }
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products designed to enhance your lifestyle.
          </p>
        </header>

        {/* Products Grid - Now handled by Client Component */}
        <ProductGrid products={products} />
      </div>
    </main>
  )
}