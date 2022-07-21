/* eslint-disable no-param-reassign */
module.exports = {
  publicRuntimeConfig: {
  },
  webpack: (config, options) => {
    if (!options.defaultLoaders) {
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
      );
    }
    return config;
  },
};
