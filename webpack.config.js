const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

// const srcDir = path.join(process.cwd(), 'src');

const base = {
  entry: {
    popup: path.join('app', 'popup.ts'),
    options: path.join('app', 'options.ts'),
    background: path.join('app', 'background.ts'),
    content: path.join('app', 'content.ts'),
    // options: scriptDir('options.ts'),
    // background: scriptDir('background.ts'),
    // content: scriptDir('content.ts'),
  },
  context: path.join(process.cwd(), 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [
          {
            loader: 'ts-loader',
            options: { onlyCompileBundledFiles: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join('app', 'options.html'),
      filename: 'options.html',
      chunks: ['options', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      template: path.join('app', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup', 'vendor'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'assets' }],
      options: {
        concurrency: 100,
      },
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.js', 'scss'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

const prod = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
};

const dev = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    publicPath: 'http://localhost:8080/',
  },
  stats: {
    colors: true,
  },
  devServer: {
    client: {
      logging: 'info',
    },
    port: 8080,
  },
  devtool: 'inline-source-map',
};

module.exports = (env) => merge(base, env && env.production ? prod : dev);
