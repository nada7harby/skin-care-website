/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#241d17',
          muted: '#6b5f54',
          soft: '#a4988c',
        },
        espresso: {
          DEFAULT: '#1a1310',
          2: '#241b16',
          3: '#2e2219',
        },
        porcelain: {
          DEFAULT: '#f7f3ee',
          paper: '#fffcf9',
          line: '#e6ddd2',
        },
        copper: {
          DEFAULT: '#a8532f',
          deep: '#7c3b20',
          bright: '#e08a52',
          glow: '#f2a86a',
        },
        sage: {
          DEFAULT: '#4c5f42',
          bright: '#93ab74',
        },
        rust: {
          DEFAULT: '#a1382b',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"Public Sans"', 'sans-serif'],
        mono: ['"Fragment Mono"', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(2.75rem, 2rem + 3.2vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-2': ['clamp(2.1rem, 1.7rem + 1.8vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-3': ['clamp(1.6rem, 1.4rem + 1vw, 2.35rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(36,29,23,0.06), 0 8px 24px -12px rgba(36,29,23,0.18)',
        'card-hover': '0 4px 10px rgba(36,29,23,0.08), 0 24px 48px -16px rgba(36,29,23,0.28)',
        glow: '0 0 0 1px rgba(232,138,82,0.35), 0 8px 32px -8px rgba(224,138,82,0.55)',
        'glow-lg': '0 0 80px -10px rgba(224,138,82,0.45)',
        label: '0 1px 0 rgba(36,29,23,0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-2%, 3%) scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
