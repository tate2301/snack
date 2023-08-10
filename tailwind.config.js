/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./layouts/**/*.{js,ts,jsx,tsx,mdx}',
		'./apps/**/*.{js,ts,jsx,tsx,mdx}',
		'./constants/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: generateScale('blue'),
				surface: generateScale('sand'),
				accent: generateScale('purple'),
				danger: generateScale('tomato'),
				warning: generateScale('amber'),
				success: generateScale('green'),
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
	jit: false,
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
