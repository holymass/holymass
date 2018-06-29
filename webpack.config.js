'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const mode = process.env.NODE_ENV || 'production';
const __DEV__ = mode === 'development';

module.exports = {
  mode: mode,
  entry: './src/index.tsx',
  watch: __DEV__,
  output: {
    path: path.join(__dirname, 'assets'),
    filename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['assets/css', 'assets/js']),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      parallel: true,
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'dependency',
    }),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
};
