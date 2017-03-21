'use strict';

let path = require('path');

module.exports = {
  rules: [
    {
      test: /\.ts$/,
      use: ['ts-loader']
    },
    {
      enforce: 'pre',
      test: /\.ts$/,
      loader: 'tslint-loader'
    }
  ]
};
