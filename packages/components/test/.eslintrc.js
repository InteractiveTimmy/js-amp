const lintES = require('../../../config/lint.es');

const output = {
  ...lintES,
};


output.plugins = ['jest'];
output.env['jest/globals'] = true;

module.exports = output;
