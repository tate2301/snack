/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.html',
		'./src/**/*.js',
		'./src/**/*.jsx',
		'./src/**/*.ts',
		'./src/**/*.tsx',
		'./public/index.html',
	],
	theme: {
		extend: {
			colors: {
				primary: generateScale('blue'),
				surface: generateScale('gray'),
				accent: generateScale('purple'),
				danger: generateScale('tomato'),
				warning: generateScale('amber'),
				success: generateScale('green'),
			},
		},
	},
	plugins: [
		    require('@tailwindcss/typography'),
	],
};

function generateScale(name) {
	let scale = Array.from({ length: 12 }, (_, i) => {
		let id = i + 1;
		return [
			[id, `var(--${name}-${id})`],
			[`a${id}`, `var(--${name}-A${id})`],
		];
	}).flat();

	return Object.fromEntries(scale);
}
