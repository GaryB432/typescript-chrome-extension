'use strict';

let path = require('path');

module.exports = {
  path: path.join(process.cwd(), 'dist'),
  filename: 'scripts/[name].js'
};
