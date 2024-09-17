import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

// Safely delete properties using the keyof operator to ensure type safety
delete colors['lightBlue' as keyof typeof colors];
delete colors['warmGray' as keyof typeof colors];
delete colors['trueGray' as keyof typeof colors];
delete colors['coolGray' as keyof typeof colors];
delete colors['blueGray' as keyof typeof colors];

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      'light-yellow': '#f8f2e4'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'top-to-bottom': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'top-to-bottom': 'top-to-bottom 400ms ease-in-out',
      },
    }
  },
  plugins: [ require( 'daisyui' ) ],
}
export default config;