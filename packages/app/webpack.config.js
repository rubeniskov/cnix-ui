const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require('path');

module.exports = () => ({
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: "./index.ts",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  stats: { errorDetails: true },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      process: "process/browser"
   }
  },
  module: {
    rules: [{
      test: /\.(js|ts|tsx)$/,
      loader: 'ify-loader',
    }, { 
      test: /\.tsx?$/, 
      loader: "ts-loader" 
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
})
