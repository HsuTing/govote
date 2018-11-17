const webpack = require('webpack');
const withLess = require('@zeit/next-less');

module.exports = withLess({
  cssModules: true,
  /* eslint-disable no-param-reassign */
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: {
        loader: 'svg-react-loader',
      },
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __IS_SERVER__: isServer.toString(),
      }),
    );

    return config;
  },
  /* eslint-enable no-param-reassign */
});
