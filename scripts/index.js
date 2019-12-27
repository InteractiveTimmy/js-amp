const commands = require('./commands/index');
const { getArguments } = require('./utils/index');

const args = getArguments(process.argv);

commands[args.command](args.params)
  .then((m) => {
    /* eslint-disable-next-line no-console */
    console.log(`successfully executed command "${args.command}"`, m || '');
  })
  .catch((e) => {
    /* eslint-disable-next-line no-console */
    console.log(`failed to execute command "${args.command}"`, e || '');
  });
