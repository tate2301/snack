/** @type {import('next').NextConfig} */
// set fs, path to empty
const nextConfig = {
	webpack(config) {
		config.resolve.fallback = {
			fs: 'empty',
			path: 'empty',
			os: 'empty',
		};

		return config;
	},
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
