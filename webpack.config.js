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
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  devServer: {
    open: true,
    historyApiFallback: true,
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
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};

module.exports = (env, argv) => {
  const PROD_MODE = env && env.production;
  config.mode = PROD_MODE ? 'production' : 'development';
  config.devtool = PROD_MODE ? 'source-maps' : 'eval';
  if (PROD_MODE) {
    config.plugins = [
      new CleanPlugin(['assets/css', 'assets/js']),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
        parallel: true,
      }),
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
    ];
  }
  return config;
};
