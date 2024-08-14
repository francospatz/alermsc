const path = require('path')


module.exports = {
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  webpack: (config, { dev, isServer }) => {

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });

    }

    return config;
  },
};
