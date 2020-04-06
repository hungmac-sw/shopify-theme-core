const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'resources/app.js'),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          {
            pattern: './resources/config/settings_data.json',
            fileName: '../config/settings_data.json',
          },
          {
            pattern: './resources/config/settings_schema.json',
            fileName: '../config/settings_schema.json',
          },
        ],
      },
    }),
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
        test: /\.(sa|sc|c)ss$/,
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
