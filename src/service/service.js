'use strict';

const {Cli} = require(`./cli`);
// const {USER_ARGV_INDEX} = require(`./constants`);

const optionName = process.argv[2];
const optionValue = process.argv[3];

console.log(`Option is:`, optionName);
switch (optionName) {
  case `--version`:
    Cli[optionName].run();
    break;
  case `--generate`:
    Cli[optionName].run(optionValue);
    break;
  case `--help`:
    Cli[optionName].run();
    break;
  default:
    console.error(`Unknown option`);
}
