/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['Nunito', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('supports-stroke', '@supports (--webkit-text-stroke)');
		}),
	],
};
