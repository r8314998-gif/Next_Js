import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/lib/types'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}))

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  description: 'This is a test product description',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  rating: 4.5,
  category: 'Test Category',
  inStock: true,
}

const mockOnViewMore = jest.fn()

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onViewMore={mockOnViewMore} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('This is a test product description')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
  })

  it('displays correct rating', () => {
    render(<ProductCard product={mockProduct} onViewMore={mockOnViewMore} />)
    
    expect(screen.getByLabelText('4.5 out of 5 stars')).toBeInTheDocument()
  })

  it('calls onViewMore when button is clicked', () => {
    render(<ProductCard product={mockProduct} onViewMore={mockOnViewMore} />)
    
    const button = screen.getByRole('button', { name: /view more details about test product/i })
    fireEvent.click(button)
    
    expect(mockOnViewMore).toHaveBeenCalledWith(mockProduct)
  })

  it('shows sale badge when product is on sale', () => {
    const saleProduct = { ...mockProduct, onSale: true, originalPrice: 129.99 }
    render(<ProductCard product={saleProduct} onViewMore={mockOnViewMore} />)
    
    expect(screen.getByLabelText('On sale')).toBeInTheDocument()
    expect(screen.getByText('$129.99')).toBeInTheDocument()
  })

  it('shows out of stock state when product is not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false }
    render(<ProductCard product={outOfStockProduct} onViewMore={mockOnViewMore} />)
    
    expect(screen.getByText('OUT OF STOCK')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view more details about test product/i })).toBeDisabled()
  })

  it('has proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} onViewMore={mockOnViewMore} />)
    
    expect(screen.getByRole('article')).toHaveAttribute('aria-labelledby', 'product-title-1')
    expect(screen.getByRole('img', { name: /test product product image/i })).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'View more details about Test Product')
  })
})