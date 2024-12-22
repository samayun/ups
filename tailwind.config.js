/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  // The content section of your tailwind.config.js file is where you configure the paths to all of your HTML templates, JavaScript components, and any other source files that contain Tailwind class names
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}', // must use this line to compile and generate our RizzUI components style
    './node_modules/@nextui-org/theme/dist/components/pagination.js', // for next ui pagination
  ],
  theme: {
    extend: {
      backgroundColor: {
        overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
      },
      screens: {
        '3xl': '1780px',
        // => @media (min-width: 1780px) { ... }
      },
      colors: {
        header: 'var(--saaskit-header-color, #ffffff)',
        sidebar: 'var(--saaskit-sidebar-color, #ffffff)',
        // background: 'var(--saaskit-background-color, #ffffff)',
        white: '#ffffff',
        black: '#000000',
        current: 'currentColor',
        transparent: 'transparent',
        'fade-gray': 'bg-[#E8E8ED]',
        error: '#D35C54',
        brand: {
          primary: '#3330FD',
          secondary: '#4D84FF',
        },

        /*
         * body, modal, drawer background & ring-offset-color
         */
        background: 'rgb(var(--background) / <alpha-value>)',

        /*
         * body text color
         */
        foreground: 'rgb(var(--foreground) / <alpha-value>)',

        /*
         * border, default flat bg color for input components, tab & dropdown hover color
         */
        muted: 'rgb(var(--muted) / <alpha-value>)',

        /*
         * disable foreground color
         */
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',

        /*
         * primary colors
         */
        primary: {
          lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--primary-default) / <alpha-value>)',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },

        /*
         * secondary colors
         */
        secondary: {
          lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--secondary-default) / <alpha-value>)',
          dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },

        /*
         * danger colors
         */
        red: {
          lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
          dark: 'rgb(var(--red-dark) / <alpha-value>)',
        },

        /*
         * warning colors
         */
        orange: {
          lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
          dark: 'rgb(var(--orange-dark) / <alpha-value>)',
        },

        /*
         * info colors
         */
        blue: {
          lighter: 'rgb(var(--blue-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--blue-default) / <alpha-value>)',
          dark: 'rgb(var(--blue-dark) / <alpha-value>)',
        },

        /*
         * success colors
         */
        green: {
          lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
          dark: 'rgb(var(--green-dark) / <alpha-value>)',
        },

        inherit: 'inherit',
        steel: {
          DEFAULT: '#1B1E27',
          50: '#f6f7f9',
          100: '#eaedf1',
          200: '#d4d9e3', // Border last range. Will use 200 and below shade
          300: '#b1b9c9',
          400: '#82889B',
          500: '#5d6274',
          600: '#3b404f',
          700: '#1b1e27', // For text and primary
          800: '#15171e',
          900: '#111318',
        },
      },
      fontFamily: {
        geist: ['var(--font-geist-sans, system-ui)'],
        lexend: ['var(--font-lexend)'],
        inter: ['var(--font-inter)'],
        lato: ['var(--font-lato)'],
        roboto: ['var(--font-roboto)'],
        kalnia: ['var(--font-kalnia)'],
        'playfair-display': ['var(--font-playfair-display)'],
        'josefin-sans': ['var(--font-josefin-sans)'],
        'poiret-one': ['var(--font-poiret-one)'],
        poppins: ['var(--font-poppins)'],
        'open-sans': ['var(--font-open-sans)'],
        sarabun: ['var(--font-sarabun)'],
        golosText: ['var(--font-golosText)'],
        figTree: ['var(--font-figTree)'],
      },
      boxShadow: {
        left: ' -1px 0px 3px 0 rgb(0,0,0 / 0.16), -1px 0px 2px -1px rgb(0,0,0 / 0.16)',
        right:
          '1px 0px 3px 0 rgb(0,0,0 / 0.16), 1px 0px 2px -1px rgb(0,0,0 / 0.16)',
        dropdown: '0px 4px 20px rgba(86, 96, 139, 0.12)',
        'dropdown-sm': '0px 4px 20px rgba(86, 96, 139, 0.05)',
        'dropdown-lg': '0px 5px 20px rgba(115, 137, 152, 0.25)',
        sidebar: '0px 4px 30px rgba(131, 148, 164, 0.05)',
        box: '0px 0px 8px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        small:
          '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
        card: '0px 3px 8px 1px rgba(27, 30, 39, 0.1)',
      },
      // requried these animations for the Loader component
      animation: {
        blink: 'blink 1.4s infinite both;',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'widget-active-ring': 'widgetActiveRing 2s infinite both',
        draw: 'draw 2s linear forwards',
      },
      keyframes: {
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100%': { opacity: 0.2 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0);',
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)',
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-3px, 0, 0)',
          },
          '40%, 60%': {
            transform: 'translate3d(3px, 0, 0)',
          },
        },
        widgetActiveRing: {
          '0%, 100%': {
            'box-shadow': `inset 2px 2px #000,
              inset -2px -2px #000;`,
          },
          '50%': {
            'box-shadow': `inset 2px 2px #48afeb,
              inset -2px -2px #48afeb;`,
          },
        },
        draw: {
          to: {
            strokeDashoffset: 0,
          },
        },
      },
      containers: {
        '2xs': '18rem',
        '8xl': '98rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant }) {
      // required this to prevent any style on readOnly input elements
      addVariant('not-read-only', '&:not(:read-only)');
      addVariant('not-disabled', '&:not([disabled])');
    }),
    require('@tailwindcss/container-queries'),
    plugin(({ matchVariant }) => {
      matchVariant('part', (p) => `:root[data-supports-dsd] &::part(${p})`);
    }),
  ],
};
