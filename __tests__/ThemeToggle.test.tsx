import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Moon: ({ className }: any) => <div className={className} data-testid="moon-icon" />,
  Sun: ({ className }: any) => <div className={className} data-testid="sun-icon" />,
}))

const ThemeToggleWithProvider = () => (
  <ThemeProvider>
    <ThemeToggle />
  </ThemeProvider>
)

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue('light')
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggleWithProvider />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('shows moon icon in light mode', () => {
    render(<ThemeToggleWithProvider />)
    
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
  })

  it('toggles theme when clicked', () => {
    render(<ThemeToggleWithProvider />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    // After click, should show sun icon and change aria-label
    setTimeout(() => {
      expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    }, 100)
  })
})