import { NextResponse } from 'next/server'
import { Product } from '@/lib/types'

const products: Product[] = [
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

export async function GET() {
  try {

    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: products,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}