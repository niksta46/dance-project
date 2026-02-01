import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        // Your existing single colors for backward compatibility
        text: '#565360',
        label: '#908E9B', 
        disabled: '#E1DFE9'
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.25' }], // 14px (added for better granularity)
        'base': ['1rem', { lineHeight: '1.5' }],   // 16px
        'lg': ['1.125rem', { lineHeight: '1.5' }], // 18px (added for better granularity)
        'xl': ['1.25rem', { lineHeight: '1.5' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '1.5' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '1.5' }], // 30px (added for better granularity)
        '4xl': ['2.25rem', { lineHeight: '1.5' }], // 36px (added for better granularity)
        '5xl': ['3rem', { lineHeight: '1' }],      // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],   // 60px (added for better granularity)
        '7xl': ['4rem', { lineHeight: '1' }]       // 64px
      }
    },
  },
  plugins: [
    flowbitePlugin,
  ],
}