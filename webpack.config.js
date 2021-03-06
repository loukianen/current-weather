const path = require('path');
const dotenv = require('dotenv');
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

dotenv.config();

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: './src/public/favicon.ico',
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
      ],
    }),
    new EnvironmentPlugin({
      WEATHER_API_TOKEN: process.env.WEATHER_API_TOKEN,
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8020,
    watchContentBase: true,
    progress: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/dist/bundle.js' },
      ],
    },
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            '@babel/env',
            '@babel/react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpg|jpeg|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
