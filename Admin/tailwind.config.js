/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "class"], // or 'media' if you want automatic dark mode detection
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			background: '#FFFFFF',
  			foreground: '#E0E7FF',
  			muted: '#8F9BB3',
  			primary: {
  				DEFAULT: 'rgb(45, 155, 103)',
  				foreground: 'rgb(50, 105, 81)'
  			},
  			accent: {
  				DEFAULT: '#8C6FFC',
  				foreground: '#121822'
  			},
  			border: '#2E3A59',
  			input: '#1F2937',
  			ring: '#00FFD1',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		boxShadow: {
  			custom: '0 0 8px 2px rgba(0, 255, 209, 0.5)'
  		},
  		fontFamily: {
  			sans: [
  				'Manrope',
  				'sans-serif'
  			],
  			heading: [
  				'Space Grotesk',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			DEFAULT: '0.5rem'
  		}
  	}
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
