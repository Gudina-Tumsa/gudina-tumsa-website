/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: "class",
    content: [
    "./src/app/pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
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
		fontFamily: {
			poppins: ["var(--font-poppins)", "sans-serif"],
			geist: ["var(--font-geist-sans)", "sans-serif"],
			geistMono: ["var(--font-geist-mono)", "monospace"],
			instrument: ["var(--font-instrument-serif)", "serif"],

		},
  	}
  },
  plugins: [],
}
