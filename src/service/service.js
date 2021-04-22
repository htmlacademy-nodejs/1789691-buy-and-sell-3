'use strict';

const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX} = require(`./constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;
console.log(`userArguments:`, userArguments, userCommand);
if (!userArguments.length || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(0);
}

Cli[userCommand].run(userArguments.slice(1));
