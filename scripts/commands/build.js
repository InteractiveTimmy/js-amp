const { execute, getFiles } = require('../utils/index');

const order = ['clean', 'lint', 'test', 'transpile', 'docs', 'compile'];

function generateConfig(params) {
  const output = {};

  const actions = params.find(item => item.argument === 'actions')
    || { targets: [...order] };
  const include = params.find(item => item.argument === 'include') || {};
  const exclude = params.find(item => item.argument === 'exclude')
    || { targets: [] };

  output.actions = actions.targets;

  output.packs = include.targets || getFiles('./packages');

  if (exclude.targets.length > 0) {
    exclude.targets.forEach((target) => {
      if (output.packs.includes(target)) {
        output.packs.splice(output.packs.indexOf(target), 1);
      }
    });
  }

  return output;
}

module.exports = params => new Promise((resolve) => {
  const config = generateConfig(params);

  const promises = config.packs.map(pack => Promise.resolve()
    .then(() => {
      if (config.actions.includes(order[0])) {
        return execute(order[0], pack);
      }

      return Promise.resolve();
    })
    .then(() => {
      if (config.actions.includes(order[1])) {
        return execute(order[1], pack);
      }

      return Promise.resolve();
    })
    .then(() => {
      if (config.actions.includes(order[2])) {
        return execute(order[2], pack);
      }

      return Promise.resolve();
    })
    .then(() => {
      if (config.actions.includes(order[3])) {
        return execute(order[3], pack);
      }

      return Promise.resolve();
    })
    .then(() => {
      if (config.actions.includes(order[4])) {
        return execute(order[4], pack);
      }

      return Promise.resolve();
    })
    .then(() => {
      if (config.actions.includes(order[5])) {
        return execute(order[5], pack);
      }

      return Promise.resolve();
    }));

  Promise.all(promises)
    .then(() => { resolve(); });
});
