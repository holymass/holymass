'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
  plugins: [
    new HtmlPlugin({
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
    'react-dom': 'ReactDOM',
  },
  devServer: {
    open: true,
    historyApiFallback: true,
  },
};

module.exports = (env, argv) => {
  const PROD_MODE = env && env.production;
  config.mode = PROD_MODE ? 'production' : 'development';
  config.devtool = PROD_MODE ? 'source-maps' : 'eval';
  if (PROD_MODE) {
    config.output.filename = 'js/[name].[chunkhash].js';
    config.output.chunkFilename = 'js/[id].[chunkhash].js';
    config.plugins.unshift(new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      parallel: true,
    }));
    config.plugins.unshift(new CleanPlugin(['assets/css', 'assets/js']));
  }
  return config;
};
