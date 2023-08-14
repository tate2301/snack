/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
