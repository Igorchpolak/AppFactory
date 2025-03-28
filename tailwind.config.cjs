/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		screens: {
			// Mobile first approach (min-width)
			'xs': '480px',      // Extra small devices
			'sm': '640px',      // Small devices
			'md': '768px',      // Medium devices
			'lg': '1024px',     // Large devices
			'xl': '1280px',     // Extra large devices
			'2xl': '1540px',    // 2X large devices
			
			// Custom breakpoints
			'tablet': '768px',
			'desktop': '1024px',
			'wide-screen': '1440px',
			
			// Max-width queries (mobile first alternative)
			'max-xs': { 'max': '479px' },
			'max-sm': { 'max': '639px' },
			'max-md': { 'max': '767px' },
			
			// Range queries
			'sm-md': { 'min': '640px', 'max': '767px' }
		  },
		  extend: {
			// Additional custom breakpoint-related utilities
			containers: {
			  'xs': '320px',
			  'sm': '540px',
			  'md': '720px',
			  'lg': '960px',
			  'xl': '1140px',
			  '2xl': '1320px'
			}
		  },
		extend: {
			fontFamily: {
				'mono': ['"Rammetto One"', 'SFMono-Regular', 'monospace'],
				'sans': ['Roboto', 'sans-serif'],
			  }
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
}