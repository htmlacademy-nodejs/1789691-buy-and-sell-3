'use strict';

const {Cli} = require(`./cli`);
const {FILE_NAME, USER_ARGV_INDEX} = require(`./constants`);
const fs = require(`fs`);

const optionName = process.argv[2];
const optionValue = process.argv[3];

console.log(`Option is:`, optionName);
switch (optionName) {
  case `--version`:
    Cli[optionName].run();
    break;
  case `--generate`:
    const advertisements = Cli[optionName].run(optionValue);
    fs.writeFile(FILE_NAME, JSON.stringify(advertisements), (error) => {
      if (error) {
        console.error(`Can't write data to file. Error:`, error);
        process.exit(1);
      }
      console.info(`Operation succeded. File has been created.`);
      process.exit();
    });
    break;
  case `--help`:
    Cli[optionName].run();
    break;
  default:
    console.error(`Unknown option`);
}
