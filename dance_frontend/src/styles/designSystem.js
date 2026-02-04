/**
 * Design System Constants
 * Single source of truth for all design tokens
 */

// Color Palette
export const colors = {
  primary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#5B0E14',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  secondary: {
    50: '#FEFCE8',
    100: '#FEF9C3',
    200: '#FEF08A',
    300: '#FDE047',
    400: '#FACC15',
    500: '#F1E194',
    600: '#EAB308',
    700: '#CA8A04',
    800: '#A16207',
    900: '#854D0E',
  },
  neutral: {
    50: '#F2F5F5',
    100: '#F2F2F2',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Semantic colors
  text: '#565360',
  label: '#908E9B',
  disabled: '#E1DFE9',
  white: '#FFFFFF',
  black: '#000000',
};

// Typography Scale
export const typography = {
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1' }],     // 12px
    sm: ['0.875rem', { lineHeight: '1.25' }], // 14px
    base: ['1rem', { lineHeight: '1.5' }],   // 16px
    lg: ['1.125rem', { lineHeight: '1.5' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.5' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '1.5' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '1.5' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '1.5' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],      // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],   // 60px
    '7xl': ['4rem', { lineHeight: '1' }]       // 64px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
  }
};

// Spacing Scale (when added to Tailwind)
export const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  13: '3.25rem',   // 52px
  14: '3.5rem',    // 56px
  15: '3.75rem',   // 60px
  16: '4rem',      // 64px
};

// Component Variants
export const buttonVariants = {
  primary: {
    base: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300',
    disabled: 'opacity-50 cursor-not-allowed',
    size: {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    }
  },
  secondary: {
    base: 'bg-secondary-500 text-gray-900 hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300',
    disabled: 'opacity-50 cursor-not-allowed',
    size: {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    }
  },
  outline: {
    base: 'border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-4 focus:ring-primary-300',
    disabled: 'opacity-50 cursor-not-allowed',
    size: {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    }
  }
};

export const cardVariants = {
  default: {
    base: 'bg-white border border-neutral-200 rounded-lg shadow-sm',
    padding: {
      none: '',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8',
    }
  },
  elevated: {
    base: 'bg-white border border-neutral-200 rounded-lg shadow-lg',
    padding: {
      none: '',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8',
    }
  },
  outlined: {
    base: 'bg-white border-2 border-primary-500 rounded-lg',
    padding: {
      none: '',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8',
    }
  }
};

export const textVariants = {
  heading: {
    h1: 'text-4xl font-bold text-gray-900',
    h2: 'text-3xl font-bold text-gray-900',
    h3: 'text-2xl font-bold text-gray-900',
    h4: 'text-xl font-bold text-gray-900',
    h5: 'text-lg font-bold text-gray-900',
    h6: 'text-base font-bold text-gray-900',
  },
  body: {
    large: 'text-lg text-gray-700',
    base: 'text-base text-gray-700',
    small: 'text-sm text-gray-700',
    xs: 'text-xs text-gray-700',
  },
  label: {
    base: 'text-sm text-label font-medium',
    large: 'text-base text-label font-medium',
  },
};

// Layout Patterns
export const layout = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 md:py-16 lg:py-20',
  card: 'bg-white rounded-lg shadow-sm border border-neutral-200',
  button: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
};

// Animation Patterns
export const animations = {
  transition: {
    base: 'transition duration-200 ease-in-out',
    fast: 'transition duration-150 ease-in-out',
    slow: 'transition duration-300 ease-in-out',
  },
  scale: {
    hover: 'hover:scale-105',
    active: 'active:scale-95',
  },
  opacity: {
    hover: 'hover:opacity-80',
    focus: 'focus:opacity-100',
  }
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Default Exports
export default {
  colors,
  typography,
  spacing,
  buttonVariants,
  cardVariants,
  textVariants,
  layout,
  animations,
  breakpoints,
};