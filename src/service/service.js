'use strict';

const {Cli} = require(`./cli`);

const optionName = process.argv[2];

console.log(`Option is:`, optionName);
switch (optionName) {
  case `--version`:
    const version = Cli[optionName].run();
    console.info(`The current version is: ${version}`);
    break;
  default:
    console.error(`Unknown option`);
}
