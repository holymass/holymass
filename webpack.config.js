'use strict';

const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = (env, argv) => {
  const prodMode = argv.mode === 'production';
  const config = {
    mode: argv.mode || 'development',
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'assets'),
      publicPath: '/assets/',
      filename: prodMode ? 'js/[name].[chunkhash].js' : 'js/[name].js',
      chunkFilename: prodMode ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    },
    resolve: {
      alias: {
        'components': path.resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.css$/,
        use: [{
          loader: ExtractCssChunksPlugin.loader,
        }, {
          loader: 'css-loader',
        }],
      }],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          extractComments: true,
          uglifyOptions: {
            compress: {
              warnings: false,
            },
          },
          chunkFilter: (chunk) => {
            // Exclude uglification for the `vendors` chunk
            return chunk.name !== 'vendors';
          },
          parallel: true,
        }),
        new OptimizeCssAssetsPlugin(),
      ],
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            chunks: 'all',
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
    plugins: [
      new LoadablePlugin({
        writeToDisk: true,
      }),
      new ExtractCssChunksPlugin({
        filename: prodMode ? 'css/[name].[contenthash].css' : 'css/[name].css',
        chunkFilename: prodMode ?
            'css/[name].[contenthash].css' : 'css/[name].css',
      }),
    ],
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    devServer: {
      compress: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
        '/': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
        },
      },
    },
  };
  if (prodMode) {
    config.plugins.unshift(new CleanPlugin({
      cleanOnceBeforeBuildPatterns: [
        'assets/css',
        'assets/js',
      ],
    }));
  } else {
    config.devtool = 'eval';
  }
  return config;
};
