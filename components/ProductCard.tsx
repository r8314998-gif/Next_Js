'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Tag } from 'lucide-react'
import { ProductCardProps } from '@/lib/types'

export function ProductCard({ product, onViewMore }: ProductCardProps) {
  const handleViewMore = () => {
    if (onViewMore) {
      onViewMore(product)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
        aria-hidden="true"
      />
    ))
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow hover:shadow-2xl transition-all duration-300 group"
      role="article"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-12 relative h-48 sm:h-56">
          <Image
            src={product.image}
            alt={`${product.title} product image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
          />
        </div>
        
        {/* Sale Badge */}
        {product.onSale && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full flex items-center gap-1"
            aria-label="On sale"
          >
            <Tag className="w-3 h-3" />
            SALE
          </motion.div>
        )}
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg" role="status" aria-live="polite">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Category */}
        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide mb-2">
          {product.category}
        </div>

        {/* Title */}
        <h2 
          id={`product-title-${product.id}`}
          className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
        >
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center" role="img" aria-label={`${product.rating} out of 5 stars`}>
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({product.rating})
          </span>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {product.onSale && product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleViewMore}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
            product.inStock
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
          aria-label={`View more details about ${product.title}`}
          type="button"
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          {product.inStock ? 'View More' : 'Out of Stock'}
        </motion.button>
      </div>
    </motion.article>
  )
}