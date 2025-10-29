export interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
  rating: number
  category: string
  inStock: boolean
  onSale?: boolean
  originalPrice?: number
}

export interface ProductCardProps {
  product: Product
  onViewMore?: (product: Product) => void
}