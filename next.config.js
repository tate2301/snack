/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback.path = false;
		}

		return config;
	},

	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
