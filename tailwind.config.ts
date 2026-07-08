import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        netflix: {
          black: '#0a0a0a',
          dark: '#141414',
          gray: '#2f2f2f',
          light: '#b3b3b3',
          red: '#e50914',
          redHover: '#f40612',
        },
      },
    },
  },
  plugins: [],
};

export default config;
