const webpack = require('webpack');
const withLess = require('@zeit/next-less');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

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

    if (!isServer) {
      config.module.rules.find(
        ({ use }) =>
          use instanceof Array &&
          use.find(({ loader }) => loader === 'less-loader'),
      ).exclude = /node_modules/;

      config.module.rules.push({
        test: /\.less$/,
        include: /node_modules\/antd\/lib/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: {
                'primary-color': '#fabf3e',
                'border-radius-base': '0px',
              },
            },
          },
        ],
      });
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        __IS_SERVER__: isServer.toString(),
      }),
    );

    return config;
  },
  /* eslint-enable no-param-reassign */
});
