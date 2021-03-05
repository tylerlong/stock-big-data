/* eslint-disable node/no-unpublished-import */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/web/index.tsx',
  output: {
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Stock Big Data',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};

export default [config];
