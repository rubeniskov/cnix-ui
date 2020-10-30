const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const path = require('path');

const {
  aliases,
  extensions,
} = require('./utils/config');

const dev = process.NODE_ENV !== 'production';

module.exports = () => {
  console.log('Detected alias', aliases);
  return ({
    entry: './src/index.js',
    devtool: dev ? 'cheap-module-source-map' : false,
    context: __dirname,
    mode: dev ? 'development' : 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: dev ? '[name].js' : '[hash].js',
      publicPath: process.env.ASSET_PATH || '/',
    },
    plugins: [
      ...(dev && [
        new ErrorOverlayPlugin(),
      ]),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development',
      }),
    ],
    resolve: {
      fallback: { buffer: require.resolve('buffer/') },
      extensions,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          loader: 'ify-loader',
        },
        // Babel transpiler
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.md$/,
          loader: 'raw-loader',
        },
      ],
    },
  });
};
