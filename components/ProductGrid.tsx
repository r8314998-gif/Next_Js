'use client'

import { ProductCard } from './ProductCard'
import { Product } from '@/lib/types'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const handleViewMore = (product: Product) => {
    console.log('View more clicked for product:', product.title)
   alert(`Viewing more details for: ${product.title}`)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No products available at the moment.
        </p>
      </div>
    )
  }

  return (
    <section 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      aria-label="Product catalog"
    >
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onViewMore={handleViewMore}
        />
      ))}
    </section>
  )
}