// internal imports
const { getFiles, json } = require('../utils/index');

function generateConfig(params) {
  // generate output namespace for method
  const output = {};

  // locate necessary param objects
  const preserve = params.find(item => item.argument === 'preserve');
  const include = params.find(item => item.argument === 'include') || {};
  const exclude = params.find(item => item.argument === 'exclude')
    || { targets: [] };

  // set output clear based on preserve argument
  output.clear = (preserve === undefined);

  // generate a list of packs to include
  output.packs = include.targets || getFiles('./packages');

  // remove any excluded packages
  if (exclude.targets.length > 0) {
    exclude.targets.forEach((target) => {
      if (output.packs.includes(target)) {
        output.packs.splice(output.packs.indexOf(target), 1);
      }
    });
  }
  // return output config

  return output;
}

module.exports = params => new Promise((resolve) => {
  const config = generateConfig(params);
  // read files
  const mp = json.read('./package.json');
  const commands = getFiles('./scripts/commands');

  // remove index.js from file list
  commands.splice(commands.indexOf('index.js'), 1);

  // clean current scripts
  if (config.clear) {
    mp.scripts = {};
  }

  // generate monorepo scripts
  commands.forEach((key) => {
    mp.scripts[key.slice(0, -3)] = `node ./scripts/index ${key.slice(0, -3)}`;
  });

  // declare namespace outside of loop
  let op;

  // generate package scripts
  config.packs.forEach((pack) => {
    op = json.read(`./packages/${pack}/package.json`);

    Object.keys(op.scripts).forEach((key) => {
      mp.scripts[`${pack}:${key}`] = (
        `cd ./packages/${pack}/ && npm run ${key}`
      );
    });
  });

  // write new package.json
  json.write('./package.json', mp);

  resolve();
});
