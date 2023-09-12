/* config-overrides.js */

module.exports = function override(config, env) {
	//do stuff with the webpack config...
	config.resolve.fallback = {
		util: require.resolve('util/'),
		path: require.resolve('path-browserify'),
		fs: 'empty',
		crypto: require.resolve('crypto-browserify'),
	};
	config.target = 'electron-renderer';
	return config;
};
