'use strict';

let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let path = require('path');

module.exports = [
  new webpack.ProgressPlugin(),
  new CopyWebpackPlugin([
    { from: 'public' }
  ])
];
