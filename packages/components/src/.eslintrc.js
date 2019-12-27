const lintES = require('../../../config/lint.es');
const lintTS = require('../../../config/lint.ts');

const output = {
  ...lintES,
  ...lintTS,
};

output.env.browser = true;

module.exports = output;
