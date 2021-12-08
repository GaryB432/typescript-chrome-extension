const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.join(process.cwd(), 'src');

function scriptDir(script) {
  return path.join(srcDir, 'app', script);
}

module.exports = {
  entry: {
    popup: scriptDir('popup.ts'),
    options: scriptDir('options.ts'),
    background: scriptDir('background.ts'),
    content: scriptDir('content.ts'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.join(srcDir, 'assets') }],
      options: { concurrency: 100 },
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'app', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'app', 'options.html'),
      filename: 'options.html',
      chunks: ['options', 'vendor'],
    }),
    // new HtmlWebpackPlugin({
    //   filename: '../popup.html',
    //   chunks: ['popup', 'vendor'],
    //   meta: {
    //     viewport: 'width=device-width,initial-scale=1',
    //     'theme-color': '#4285f4',
    //   },
    //   scriptLoading: 'blocking'
    // }),
  ],
};
