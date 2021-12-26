const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
        components: path.resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: ExtractCssChunksPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserJSPlugin({
          extractComments: true,
          parallel: true,
        }),
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
        chunkFilename: prodMode
          ? 'css/[name].[contenthash].css'
          : 'css/[name].css',
      }),
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    devServer: {
      compress: true,
      proxy: {
        '/': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
        },
      },
    },
  };
  if (prodMode) {
    config.plugins.unshift(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['css', 'js'],
      }),
    );
  } else {
    config.devtool = 'eval';
  }
  if (argv.analyze) {
    config.plugins.unshift(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    );
  }
  return config;
};
