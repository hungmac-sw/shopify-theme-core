const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  entry: {
    app: path.join(__dirname, 'resources/app.js'),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'vendor.min.css',
      chunkFilename: '[id].min.css',
    }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          {
            pattern: './resources/config/settings_data.json', fileName: '../config/settings_data.json',
          },
        ],
      },
    }),
    new CopyPlugin([
      { from: './resources/config/settings_schema.json', to: '../config/settings_schema.json' },
      { from: './resources/scss/*', to: '../assets/[name].scss', ignore: ['app.scss'] },
      { from: './resources/scss/*', to: '../assets/[name].scss.liquid', ignore: ['app.scss'] },
    ]),
  ],

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'src/assets'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        test: /app\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

    ],
  },
};
